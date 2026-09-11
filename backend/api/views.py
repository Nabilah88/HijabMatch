from rest_framework.response import Response
from rest_framework.decorators import api_view
from .color_recommendations import get_color_recommendations
from django.core.mail import send_mail
from django.conf import settings
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.core.mail import EmailMessage
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.throttling import AnonRateThrottle

class AnalysisThrottle(AnonRateThrottle):
    rate = "5/hour"

class RecolorThrottle(AnonRateThrottle):
    rate = "20/hour"

class ContactThrottle(AnonRateThrottle):
    rate = "5/hour"

class EmailResultsThrottle(AnonRateThrottle):
    rate = "5/hour"
    
import os
import base64
import urllib.request
import cv2
import numpy as np
from PIL import Image, UnidentifiedImageError
MAX_UPLOAD_BYTES = 5 * 1024 * 1024  # 5 MB
MAX_IMAGE_DIMENSION = 4000
ALLOWED_IMAGE_FORMATS = {"JPEG", "PNG", "WEBP"}
import mediapipe as mp
import json

CASCADE_PATH = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
face_cascade = cv2.CascadeClassifier(CASCADE_PATH)


# ============================================================
# SEASONAL COLOR ANALYSIS
# ============================================================
def load_valid_image(image_file):
    if image_file.size > MAX_UPLOAD_BYTES:
        return None, "Please upload an image smaller than 5 MB."

    try:
        with Image.open(image_file) as uploaded_image:
            image_format = uploaded_image.format
            width, height = uploaded_image.size

            if image_format not in ALLOWED_IMAGE_FORMATS:
                return None, "Please upload a JPG, PNG, or WebP image."

            if (
                width > MAX_IMAGE_DIMENSION
                or height > MAX_IMAGE_DIMENSION
            ):
                return None, "Please upload an image no larger than 4000 × 4000 pixels."

            # Checks that the file is a valid image rather than only trusting
            # its filename or browser-provided content type.
            uploaded_image.verify()

        # verify() invalidates the Pillow object, so reopen it for analysis.
        image_file.seek(0)

        with Image.open(image_file) as validated_image:
            validated_image.load()
            return validated_image.convert("RGB"), None

    except (UnidentifiedImageError, OSError, ValueError):
        return None, "Please upload a valid JPG, PNG, or WebP image."
    
@api_view(["POST"])
@throttle_classes([AnalysisThrottle])
def analyze_user(request):
    name = request.data.get("name", "")
    image_file = request.FILES.get("image")

    if not image_file:
        return Response({"error": "No image uploaded"}, status=400)

    pil_image, image_error = load_valid_image(image_file)

    if image_error:
        return Response({"error": image_error}, status=400)

    lighting = check_lighting(pil_image)

    if lighting != "ok":
        return Response({
            "error": (
                f"Image is {lighting.replace('_', ' ')}. "
                "Please retake in better lighting."
            )
        }, status=400)

    rgb = extract_skin_color(pil_image)
    undertone, L, a, b = classify_undertone(rgb)
    season = map_season(undertone, L, a, b)
    colors = get_color_recommendations(season)

    return Response({
        "name": name,
        "undertone": undertone,
        "season": season,
        "recommended_colors": colors["best"],
        "avoid_colors": colors["avoid"],
        "neutral_colors": colors["neutrals"],
    })
    
def check_lighting(pil_image):
    image = np.array(pil_image)
    lab = cv2.cvtColor(image, cv2.COLOR_RGB2LAB)
    L_channel = lab[:, :, 0]
    avg_L = np.mean(L_channel)

    if avg_L < 80:
        return "too_dark"
    elif avg_L > 220:
        return "too_bright"
    else:
        return "ok"


def check_lighting_quality(pil_image):
    image = np.array(pil_image)
    lab = cv2.cvtColor(image, cv2.COLOR_RGB2LAB)
    L_channel = lab[:, :, 0]
    avg_L = np.mean(L_channel)

    if avg_L < 60:
        return {"quality": "poor", "confidence": "low", "message": "Photo is too dark"}
    elif avg_L < 80:
        return {"quality": "fair", "confidence": "medium", "message": "Lighting could be better"}
    elif avg_L > 220:
        return {"quality": "poor", "confidence": "low", "message": "Photo is overexposed"}
    else:
        return {"quality": "good", "confidence": "high", "message": "Great lighting!"}


def extract_skin_color_fallback(pil_image):
    image = np.array(pil_image)
    image = cv2.resize(image, (300, 300))
    hsv = cv2.cvtColor(image, cv2.COLOR_RGB2HSV)

    lower = np.array([0, 10, 40])
    upper = np.array([35, 255, 255])

    mask = cv2.inRange(hsv, lower, upper)
    skin_pixels = image[mask > 0]

    if len(skin_pixels) == 0:
        return None

    return np.mean(skin_pixels, axis=0)


def extract_skin_color(pil_image):
    image = np.array(pil_image)
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    h, w = image.shape[:2]
    scale = 400 / max(h, w)
    image = cv2.resize(image, (int(w * scale), int(h * scale)))

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.2, 5)

    if len(faces) == 0:
        return extract_skin_color_fallback(pil_image)

    x, y, fw, fh = faces[0]

    left_cheek = image[int(y+fh*0.45):int(y+fh*0.75), int(x+fw*0.15):int(x+fw*0.40)]
    right_cheek = image[int(y+fh*0.45):int(y+fh*0.75), int(x+fw*0.60):int(x+fw*0.85)]
    forehead = image[int(y+fh*0.10):int(y+fh*0.30), int(x+fw*0.30):int(x+fw*0.70)]

    cheeks = np.vstack([
        left_cheek.reshape(-1, 3),
        right_cheek.reshape(-1, 3),
        forehead.reshape(-1, 3)
    ])

    # Wide HSV range to capture all skin tones
    cheeks_hsv = cv2.cvtColor(cheeks.reshape(-1, 1, 3), cv2.COLOR_BGR2HSV)
    lower = np.array([0, 10, 40])
    upper = np.array([35, 255, 255])

    mask = cv2.inRange(cheeks_hsv, lower, upper)
    skin_pixels = cheeks[mask.flatten() > 0]

    if len(skin_pixels) == 0:
        return extract_skin_color_fallback(pil_image)

    avg_bgr = np.mean(skin_pixels, axis=0)
    avg_rgb = avg_bgr[::-1]
    return avg_rgb


def classify_undertone(rgb):
    if rgb is None:
        return "unknown", 128, 0, 0

    rgb_uint8 = np.uint8([[rgb]])
    lab = cv2.cvtColor(rgb_uint8, cv2.COLOR_RGB2LAB)
    L, a, b = lab[0][0]

    a_shifted = int(a) - 128
    b_shifted = int(b) - 128

    if b_shifted > 10 and a_shifted > 5:
        undertone = "warm"
    elif b_shifted < 5 and a_shifted > 8:
        undertone = "cool"
    elif b_shifted < 0:
        undertone = "cool"
    else:
        undertone = "neutral"

    return undertone, float(L), a_shifted, b_shifted


def map_season(undertone, L, a=0, b=0):
    # L in OpenCV LAB: 0–255 scale (not 0–100)
    # ~140+ is light, ~100-139 is medium, below 100 is deep

    if undertone == "warm":
        if L >= 150:
            return "Light Spring"
        elif L >= 120:
            return "True Spring" if b > 15 else "Light Autumn"
        elif L >= 90:
            return "True Autumn"
        else:
            return "Deep Autumn"

    elif undertone == "cool":
        if L >= 150:
            return "Light Summer"
        elif L >= 120:
            return "True Summer" if a > 8 else "Bright Winter"
        elif L >= 90:
            return "True Winter"
        else:
            return "Deep Winter"

    else:  # neutral
        if L >= 140:
            return "Soft Summer"
        elif L >= 100:
            return "Soft Autumn"
        else:
            return "Deep Winter"


@api_view(["POST"])
@throttle_classes([EmailResultsThrottle])
def email_results(request):
    print("EMAIL ENDPOINT HIT:", request.data)

    email = request.data.get("email")
    name = request.data.get("name", "there")
    season = request.data.get("season", "Unknown")
    undertone = request.data.get("undertone", "Unknown")
    recommended_colors = request.data.get("recommended_colors", [])

    color_names = ", ".join([c.get("name", "") for c in recommended_colors[:5]])

    message = f"""
Hi {name}!

Your Hijab Match Color Analysis Results:

Season: {season}
Undertone: {undertone}

Your Perfect Colors: {color_names}

Visit Hijab Match to see your full color palette and recommendations!

Best regards,
The Hijab Match Team
"""

    try:
        send_mail(
            subject=f"Your {season} Color Analysis Results",
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
            fail_silently=False,
        )
        return Response({"message": "Results sent to your email!"}, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["POST"])
@throttle_classes([ContactThrottle])
def contact_us(request):
    name = request.data.get("name", "Anonymous")
    email = request.data.get("email", "")
    comments = request.data.get("comments", "")

    if not isinstance(email, str):
        return Response({"error": "Enter a valid email address."}, status=400)

    email = email.strip()

    try:
        validate_email(email)
    except ValidationError:
        return Response({"error": "Enter a valid email address."}, status=400)

    if not isinstance(name, str):
        name = "Anonymous"

    name = name.strip() or "Anonymous"

    if len(name) > 100:
        return Response(
            {"error": "Name is too long (max 100 characters)."},
            status=400,
        )

    if not isinstance(comments, str) or len(comments.strip()) < 5:
        return Response(
            {"error": "Message must contain at least 5 characters."},
            status=400,
        )

    comments = comments.strip()

    if len(comments) > 2000:
        return Response(
            {"error": "Message is too long (max 2000 characters)."},
            status=400,
        )

    message = (
        f"Name: {name}\n"
        f"Email: {email}\n\n"
        f"Message:\n{comments}"
    )

    try:
        EmailMessage(
            subject="New Hijab Match contact message",
            body=message,
            from_email=settings.EMAIL_HOST_USER,
            to=[settings.EMAIL_HOST_USER],
            reply_to=[email],
        ).send(fail_silently=False)

    except Exception:
        return Response(
            {"error": "We could not send your message. Please try again later."},
            status=500,
        )

    return Response(
        {"message": "Thanks — your message was sent."},
        status=200,
    )

# ============================================================
# HIJAB RECOLORING
# ============================================================

MODEL_DIR = os.path.join(settings.BASE_DIR, "vision")
MODEL_PATH = os.path.join(MODEL_DIR, "selfie_multiclass_256x256.tflite")
MODEL_URL = "https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_multiclass_256x256/float32/latest/selfie_multiclass_256x256.tflite"

BACKGROUND, HAIR, BODY_SKIN, FACE_SKIN, CLOTHES, OTHERS = 0, 1, 2, 3, 4, 5
_segmenter = None


def _ensure_model_downloaded():
    os.makedirs(MODEL_DIR, exist_ok=True)
    if not os.path.exists(MODEL_PATH):
        req = urllib.request.Request(MODEL_URL, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(MODEL_PATH, 'wb') as out_file:
            out_file.write(response.read())


def get_segmenter():
    global _segmenter
    if _segmenter is None:
        _ensure_model_downloaded()
        BaseOptions = mp.tasks.BaseOptions
        ImageSegmenter = mp.tasks.vision.ImageSegmenter
        ImageSegmenterOptions = mp.tasks.vision.ImageSegmenterOptions
        options = ImageSegmenterOptions(
            base_options=BaseOptions(model_asset_path=MODEL_PATH),
            output_category_mask=True,
        )
        _segmenter = ImageSegmenter.create_from_options(options)
    return _segmenter


def build_hijab_mask(image_bgr):
    rgb_image = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb_image)
 
    segmenter = get_segmenter()
    segmentation_result = segmenter.segment(mp_image)
    category_mask = segmentation_result.category_mask.numpy_view()
 
    raw_mask = np.isin(category_mask, [HAIR, CLOTHES, OTHERS]).astype(np.uint8) * 255
    skin_mask = np.isin(category_mask, [FACE_SKIN, BODY_SKIN]).astype(np.uint8) * 255
    raw_mask = cv2.bitwise_and(raw_mask, cv2.bitwise_not(skin_mask))
 
    kernel = np.ones((5, 5), np.uint8)
    raw_mask = cv2.morphologyEx(raw_mask, cv2.MORPH_OPEN, kernel)
    raw_mask = cv2.morphologyEx(raw_mask, cv2.MORPH_CLOSE, kernel)
 
    h, w = raw_mask.shape
    ys, xs = np.where(raw_mask > 0)
 
    # Need enough candidate pixels for clustering to mean anything;
    # otherwise just fall back to the raw category mask.
    if len(ys) < 200:
        hijab_mask = raw_mask
    else:
        lab = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2LAB).astype(np.float32)
        samples = lab[ys, xs].astype(np.float32)
        # Downweight lightness so clustering is driven mainly by hue/chroma
        # (a*, b*) rather than shadow-vs-highlight brightness differences,
        # which is what let shadowed folds get wrongly split from the rest
        # of the hijab before.
        samples_weighted = samples.copy()
        samples_weighted[:, 0] *= 0.3
 
        try:
            criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 0.5)
            _, labels, _ = cv2.kmeans(
                samples_weighted, 2, None, criteria, 5, cv2.KMEANS_PP_CENTERS
            )
            labels = labels.flatten()
 
            label_map = -np.ones((h, w), dtype=np.int32)
            label_map[ys, xs] = labels
 
            # Figure out which cluster the top-of-head anchor region
            # belongs to (this is "the hijab," by construction/definition)
            anchor = label_map[0:h // 8, w // 3:2 * w // 3]
            anchor_labels = anchor[anchor >= 0]
 
            if len(anchor_labels) > 0:
                hijab_cluster = np.bincount(anchor_labels).argmax()
                hijab_mask = np.where(label_map == hijab_cluster, 255, 0).astype(np.uint8)
            else:
                hijab_mask = raw_mask
        except cv2.error:
            hijab_mask = raw_mask
        
        raw_area = np.count_nonzero(raw_mask)
        clustered_area = np.count_nonzero(hijab_mask)

        if raw_area > 0 and (clustered_area / raw_area) < 0.4:
         hijab_mask = raw_mask

        close_kernel = np.ones((9, 9), np.uint8)   # <-- this line was already there
        hijab_mask = cv2.morphologyEx(hijab_mask, cv2.MORPH_CLOSE, close_kernel)
 
    close_kernel = np.ones((9, 9), np.uint8)
    hijab_mask = cv2.morphologyEx(hijab_mask, cv2.MORPH_CLOSE, close_kernel)
 
    # Safety net kept from the previous fix: drop any blob not attached
    # to the head region (stray hair wisps etc.) — cheap insurance even
    # though the clustering above does most of the real work now.
    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(hijab_mask, connectivity=8)
    if num_labels > 1:
        head_region_labels = labels[0:h // 6, w // 3:2 * w // 3]
        head_labels = np.unique(head_region_labels[head_region_labels != 0])
        if len(head_labels) > 0:
            hijab_mask = (np.isin(labels, head_labels).astype(np.uint8)) * 255
        else:
            largest_label = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
            hijab_mask = ((labels == largest_label).astype(np.uint8)) * 255
 
    return hijab_mask
 
 
def recolor_hijab(image_bgr, mask, target_hex, dilate_px=3, feather_px=3,
                   saturation_boost=1.0, value_blend=0.35):
    target_hex = target_hex.lstrip('#')
    target_rgb = tuple(int(target_hex[i:i + 2], 16) for i in (0, 2, 4))
    target_bgr = np.uint8([[target_rgb[::-1]]])
    target_hsv = cv2.cvtColor(target_bgr, cv2.COLOR_BGR2HSV)[0][0]
    target_hue, target_sat, target_val = int(target_hsv[0]), int(target_hsv[1]), int(target_hsv[2])
 
    # NEW: adapt the value blend based on how extreme the target color is.
    # A fixed 0.35 blend preserves fold shading nicely for normal colors,
    # but for near-black/near-white targets it lets so much of the
    # original shading through that black reads as muddy dark gray/brown
    # instead of black. Push the blend much higher only at the extremes,
    # leaving ordinary mid-tone colors (most of the palette) unaffected.
    extremity = abs(target_val - 127.5) / 127.5  # 0.0 mid-tone -> 1.0 true black/white
    adaptive_blend = value_blend + (0.9 - value_blend) * (extremity ** 2)
    adaptive_blend = min(adaptive_blend, 0.9)
 
    hsv = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2HSV).astype(np.float32)
    recolored_hsv = hsv.copy()
    recolored_hsv[:, :, 0] = target_hue
    recolored_hsv[:, :, 1] = np.clip(target_sat * saturation_boost, 0, 255)
    original_v = hsv[:, :, 2]
    recolored_hsv[:, :, 2] = np.clip(
        original_v * (1 - adaptive_blend) + target_val * adaptive_blend, 0, 255
    )
    recolored_hsv = recolored_hsv.astype(np.uint8)
    recolored_bgr = cv2.cvtColor(recolored_hsv, cv2.COLOR_HSV2BGR)
 
    dilate_kernel = np.ones((dilate_px, dilate_px), np.uint8)
    dilated_mask = cv2.dilate(mask, dilate_kernel)
    feathered_mask = cv2.GaussianBlur(dilated_mask, (0, 0), sigmaX=feather_px)
    alpha = (feathered_mask.astype(np.float32) / 255.0)[:, :, np.newaxis]
 
    blended = (recolored_bgr.astype(np.float32) * alpha +
               image_bgr.astype(np.float32) * (1 - alpha))
    return blended.astype(np.uint8)

THUMBNAIL_MAX_DIM = 400  # px, longest side
 
 
@api_view(["POST"])
@throttle_classes([RecolorThrottle])
def recolor_swatches_view(request):
    image_file = request.FILES.get("image")
    colors_raw = request.data.get("colors")

    if not image_file or not colors_raw:
        return Response(
            {"error": "image and colors are required"},
            status=400,
        )

    try:
        colors = json.loads(colors_raw)
    except (TypeError, json.JSONDecodeError):
        return Response(
            {"error": "colors must be a valid list"},
            status=400,
        )

    if not isinstance(colors, list) or not colors:
        return Response(
            {"error": "colors must be a non-empty list"},
            status=400,
        )

    pil_image, image_error = load_valid_image(image_file)

    if image_error:
      return Response({"error": image_error}, status=400)
    image_bgr = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)

    # Keep thumbnails fast and lightweight.
    h, w = image_bgr.shape[:2]
    scale = THUMBNAIL_MAX_DIM / max(h, w)
    if scale < 1:
        image_bgr = cv2.resize(
            image_bgr,
            (int(w * scale), int(h * scale)),
            interpolation=cv2.INTER_AREA,
        )

    try:
        hijab_mask = build_hijab_mask(image_bgr)
    except Exception:
        return Response(
            {"error": "Could not create color previews"},
            status=500,
        )

    thumbnails = {}

    for hex_color in colors[:8]:
        if not isinstance(hex_color, str) or not hex_color.startswith("#"):
            continue

        try:
            recolored_bgr = recolor_hijab(
                image_bgr,
                hijab_mask,
                hex_color,
            )

            success, buffer = cv2.imencode(".png", recolored_bgr)
            if not success:
                continue

            encoded_image = base64.b64encode(buffer).decode("utf-8")
            thumbnails[hex_color] = (
                f"data:image/png;base64,{encoded_image}"
            )
        except Exception:
            continue

    return Response({"thumbnails": thumbnails})

@api_view(["POST"])
@throttle_classes([RecolorThrottle])
def recolor_hijab_view(request):
    image_file = request.FILES.get("image")
    target_color = request.data.get("target_color")

    if not image_file or not target_color:
        return Response(
            {"error": "image and target_color are required"},
            status=400,
        )

    # Basic hex-colour validation
    if not isinstance(target_color, str) or not target_color.startswith("#"):
        return Response({"error": "Invalid target color"}, status=400)

    pil_image, image_error = load_valid_image(image_file)

    if image_error:
       return Response({"error": image_error}, status=400)

    image_bgr = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)

    try:
        hijab_mask = build_hijab_mask(image_bgr)
        recolored_bgr = recolor_hijab(image_bgr, hijab_mask, target_color)
    except Exception:
        return Response(
            {"error": "Could not create the recolor preview"},
            status=500,
        )

    success, buffer = cv2.imencode(".png", recolored_bgr)
    if not success:
        return Response(
            {"error": "Could not create the recolor preview"},
            status=500,
        )

    encoded_image = base64.b64encode(buffer).decode("utf-8")

    return Response({
        "recolored_image": f"data:image/png;base64,{encoded_image}"
    })