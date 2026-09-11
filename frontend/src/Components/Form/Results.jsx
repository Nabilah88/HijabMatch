import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Layer,
  Form,
  FormField,
  TextInput,
  Spinner,
  ResponsiveContext,
} from "grommet";
import { useLocation, useNavigate } from "react-router-dom";
import { Refresh, MailOption, Download, Camera, Close, Checkmark } from "grommet-icons";
import HeartIcon from "../../assets/heart.svg"
import SparkleIcon from "../../assets/sparkling.svg"
import swatchIcon from "../../assets/swatch.svg"
import crossIcon from  "../../assets/crosscircle.svg"


const API_BASE = "http://127.0.0.1:8000";
const FONT_FAMILY = "'Poppins', 'Segoe UI', sans-serif";

// ---- Small shared pieces ----

const GlassCard = ({ children, pad = "20px", ...rest }) => (
  <Box
    style={{
      background: "rgba(80, 20, 60, 0.55)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      borderRadius: "18px",
      border: "1px solid rgba(255,255,255,0.18)",
      boxShadow: "0 28px 72px rgba(0,0,0,0.22)",
    }}
    pad={pad}
    gap="12px"
    {...rest}
  >
    {children}
  </Box>
);
 

// Single swatch renderer used everywhere colors are shown
const SwatchRow = ({ colors, swatchSize = "56px", shape = "small", onSwatchClick, selectedHex }) => (
  <Box direction="row" gap="10px" wrap justify="center">
    {(colors || []).map((color) => {
      const selected = selectedHex === color.hex;
      return (
        <Box key={color.name} align="center" gap="6px" width={{ max: "80px" }}>
          <Button
            plain
            onClick={onSwatchClick ? () => onSwatchClick(color) : undefined}
            style={{ cursor: onSwatchClick ? "pointer" : "default" }}
          >
            <Box
              background={color.hex}
              width={swatchSize}
              height={swatchSize}
              round={shape}
              style={{
                outline: selected ? "2px solid white" : "none",
                outlineOffset: "2px",
                flexShrink: 0,
              }}
            />
          </Button>
          <Text
            size="11px"
            color="white"
            textAlign="center"
            style={{ fontFamily: FONT_FAMILY, lineHeight: 1.3, wordBreak: "break-word" }}
          >
            {color.name}
          </Text>
        </Box>
      );
    })}
  </Box>
);
// Like SwatchRow, but shows the user's own photo recolored to each
// swatch instead of a flat color square. Used only in "Your Glow,
// See the Difference" — falls back to a flat color swatch per-item
// if that color's thumbnail hasn't loaded (or failed) yet, so the
// section never looks broken while thumbnails are in flight.
const PhotoSwatchRow = ({ colors, thumbnails, loading, swatchSize = "64px" }) => (
  <Box direction="row" gap="10px" wrap justify="center">
    {(colors || []).map((color) => {
      const thumb = thumbnails?.[color.hex];
      return (
        <Box key={color.name} align="center" gap="8px" width={{ max: "128px" }}>
          <Box
            width={swatchSize}
            height={swatchSize}
            round="12px"
            overflow="hidden"
            background={color.hex}
            style={{
              border: "2px solid rgba(255,255,255,0.3)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.28)",
              flexShrink: 0,
              position: "relative",
            }}
          >
            {thumb ? (
              <img
                src={thumb}
                alt={color.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            ) : loading ? (
              <Box fill align="center" justify="center">
                <Spinner size="small" />
              </Box>
            ) : null}
          </Box>
          <Text
            size="12px"
            color="white"
            textAlign="center"
            style={{ fontFamily: FONT_FAMILY, lineHeight: 1.3, wordBreak: "break-word" }}
          >
            {color.name}
          </Text>
        </Box>
      );
    })}
  </Box>
);
 
const TrustBadge = ({ Icon, label, sub }) => (
  <Box align="center" gap="4px" pad={{ horizontal: "small" }} width={{ max: "220px" }}>
    <Icon color="white" size="18px" />
    <Text size="12px" weight="bold" color="white" textAlign="center" style={{ fontFamily: FONT_FAMILY }}>
      {label}
    </Text>
    <Text size="11px" color="rgba(255,255,255,0.75)" textAlign="center" style={{ fontFamily: FONT_FAMILY, lineHeight: 1.4 }}>
      {sub}
    </Text>
  </Box>
);
const Results = () => {
    const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const size = useContext(ResponsiveContext); // 'small' | 'medium' | 'large' | ...
  const isSmall = size === "small";
 
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(null);
 
  const [selectedSwatch, setSelectedSwatch] = useState(null);
 const [displayedPhotoUrl, setDisplayedPhotoUrl] = useState(
  state?.imageFile ? URL.createObjectURL(state.imageFile) : null
);
  const [isRecoloring, setIsRecoloring] = useState(false);
  const [recolorError, setRecolorError] = useState(null);
 
  const [swatchThumbnails, setSwatchThumbnails] = useState({});
  const [thumbnailsLoading, setThumbnailsLoading] = useState(false);
  // ---- Fetch "Your Glow" thumbnails once, on load ----
  // One batch request covers every avoid/recommended color so the
  // backend only runs segmentation once instead of once per swatch.
useEffect(() => {
  if (!state?.imageFile) return;

  const avoid = state?.avoid_colors || [];
  const recommended = (state?.recommended_colors || []).slice(0, 4);
  const combined = [...avoid, ...recommended];

  if (combined.length === 0) return;

  const uniqueColors = Object.values(
    combined.reduce((acc, color) => {
      acc[color.hex] = color;
      return acc;
    }, {})
  );

  const formData = new FormData();
  formData.append("image", state.imageFile);
  formData.append(
    "colors",
    JSON.stringify(uniqueColors.map((color) => color.hex))
  );

  setThumbnailsLoading(true);

  fetch(`${API_BASE}/api/recolor-swatches/`, {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      if (!res.ok) throw new Error("Batch recolor failed");
      return res.json();
    })
    .then((data) => setSwatchThumbnails(data.thumbnails || {}))
    .catch(() => setSwatchThumbnails({}))
    .finally(() => setThumbnailsLoading(false));
}, [state?.imageFile]);

  // ---- Email results ----
  const handleEmailSubmit = async (value) => {
    setEmailError(null);
    try {
      const res = await fetch(`${API_BASE}/api/email-results/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: value.email,
          name: state?.name,
          season: state?.season,
          undertone: state?.undertone,
          recommended_colors: state?.recommended_colors,
        }),
      });
      if (res.ok) {
        setEmailSent(true);
        setTimeout(() => {
          setShowEmailForm(false);
          setEmailSent(false);
        }, 2000);
      } else {
        setEmailError("Could not send email — try again.");
      }
    } catch (err) {
      setEmailError("Could not send email — try again.");
    }
  };

  // ---- Recolor ----
 const handleSwatchClick = async (color) => {
  setSelectedSwatch(color);
  setRecolorError(null);

  if (!state?.imageFile) {
    setRecolorError("Your photo is no longer available. Please analyze it again.");
    return;
  }

  const formData = new FormData();
  formData.append("image", state.imageFile);
  formData.append("target_color", color.hex);

  setIsRecoloring(true);

  try {
    const res = await fetch(`${API_BASE}/api/recolor-hijab/`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Recolor failed");

    const data = await res.json();
    setDisplayedPhotoUrl(data.recolored_image);
  } catch {
    setRecolorError("Could not preview that color — try again.");
  } finally {
    setIsRecoloring(false);
  }
};
 const handleResetPhoto = () => {
  setSelectedSwatch(null);

  if (state?.imageFile) {
    setDisplayedPhotoUrl(URL.createObjectURL(state.imageFile));
  }

  setRecolorError(null);
};
 const outerPad = isSmall
    ? { horizontal: "18px", vertical: "24px" }
    : size === "medium"
    ? { horizontal: "36px", vertical: "32px" }
    : { horizontal: "60px", vertical: "40px" };
 
  const sectionGap = isSmall ? "18px" : "24px";
  const heroImgMaxHeight = isSmall ? "260px" : "300px";
  return (
    <Box
      style={{
        background: "linear-gradient(180deg, rgba(255,182,193,0.3), rgba(146, 53, 146, 0.6))",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: FONT_FAMILY,
      }}
      pad={outerPad}
      gap={sectionGap}
    >
   
  
      <Box
        style={{
          position: "absolute", bottom: "-60px", left: "30%",
          width: "280px", height: "280px", borderRadius: "50%",
          background: "rgba(255,255,255,0.04)", pointerEvents: "none",
        }}
      />

      {/* Header */}
      <Box
        direction="row-responsive"
        wrap
        justify="between"
        align="center"
        gap="12px"
        style={{ position: "relative", zIndex: 1 }}
      >
    
        <Box direction="row" wrap gap="small" style={{ marginLeft: "auto", alignItems: "center" }}>
          <Button
            icon={<Camera color="white" size="16px" />}
            label={
              <Text size="small" color="white" style={{ fontFamily: FONT_FAMILY, whiteSpace: "nowrap" }}>
                {isSmall ? "Retake" : "Analyze Another Photo"}
              </Text>
            }
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "999px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
              minWidth: isSmall ? undefined : "220px",
            }}
            pad={{ horizontal: isSmall ? "medium" : "large", vertical: "small" }}
            onClick={() => navigate("/analyze")}
          />
          <Button
            icon={<MailOption color="#6B2D8B" size="16px" />}
            label={
              <Text size="small" weight="bold" color="#6B2D8B" style={{ fontFamily: FONT_FAMILY, whiteSpace: "nowrap" }}>
                {isSmall ? "Email" : "Email My Results"}
              </Text>
            }
            style={{ borderRadius: "999px", boxShadow: "0 8px 20px rgba(107,45,139,0.08)" }}
            primary
            color="white"
            pad={{ horizontal: "medium", vertical: "small" }}
            onClick={() => setShowEmailForm(true)}
          />
        </Box>
      </Box>

      {/* Hero: photo + intro + Your Best Colors */}
      <Box direction="row-responsive" gap={isSmall ? "24px" : "40px"} style={{ position: "relative", zIndex: 1 }}>
        <Box style={{ maxWidth: isSmall ? "100%" : "320px", width: "100%" }} alignSelf={isSmall ? "center" : "start"}>
          <GlassCard pad={isSmall ? "14px" : "20px"}>
            <Box
              style={{ borderRadius: "14px", overflow: "hidden", position: "relative" }}
              align="center" justify="center"
            >
              {displayedPhotoUrl ? (
                <img
                  src={displayedPhotoUrl}
                  alt="Your upload"
                  style={{
                    width: "100%",
                    maxHeight: heroImgMaxHeight,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : (
                <Text size="small" color="white" style={{ fontFamily: FONT_FAMILY }}>
                  Your photo will appear here
                </Text>
              )}
              {isRecoloring && (
                <Box
                  fill align="center" justify="center"
                  background="#00000055"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                >
                  <Spinner color="white" />
                  <Text size="xsmall" color="white" margin={{ top: "small" }} style={{ fontFamily: FONT_FAMILY }}>
                    Previewing color...
                  </Text>
                </Box>
              )}
              {/* (Removed top overlay) */}
              <Box
                style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "rgba(80, 20, 60, 0.82)", padding: "10px 12px",
                }}
                align="center"
              >
                <Text size="11px" color="rgba(255,255,255,0.85)" style={{ fontFamily: FONT_FAMILY }}>
                  Your Season
                </Text>
                <Text size="15px" weight={700} color="white" style={{ fontFamily: FONT_FAMILY, marginTop: 4 }}>
                  {state?.season}
                </Text>
              </Box>
            </Box>
            {selectedSwatch && !isRecoloring && (
              <Box direction="row" wrap align="center" justify="between" gap="xsmall">
                <Box direction="row" align="center" gap="xsmall">
                  <Box width="12px" height="12px" round="full" background={selectedSwatch.hex} style={{ flexShrink: 0 }} />
                  <Text size="11px" color="white" style={{ fontFamily: FONT_FAMILY }}>
                    Previewing: {selectedSwatch.name}
                  </Text>
                </Box>
                <Button
                  plain
                  onClick={handleResetPhoto}
                  icon={<Refresh color="rgba(255,255,255,0.8)" size="12px" />}
                  label={<Text size="11px" color="rgba(255,255,255,0.8)" style={{ fontFamily: FONT_FAMILY }}>Reset</Text>}
                />
              </Box>
            )}
            {recolorError && (
              <Text size="11px" color="#F2A0A0" style={{ fontFamily: FONT_FAMILY }}>{recolorError}</Text>
            )}
          </GlassCard>
        </Box>

        <Box flex="grow" gap="16px" justify="center" style={{ minWidth: 0 }}>
          <Box>
            <Text
              color="rgba(255,255,255,0.85)"
              style={{ fontFamily: FONT_FAMILY, fontSize: "clamp(20px, 2.4vw, 18px)" }}
              margin={{ bottom: "medium" }}
            >
              Hi, {state?.name || "there"}! 👋
            </Text>
            <Text
              weight="bold"
              color="white"
              style={{ fontFamily: FONT_FAMILY, fontSize: "clamp(20px, 5.5vw, 26px)", lineHeight: 1.15 }}
            >
              Your Season is {state?.season || "Unknown"}
            </Text>
            <Text
              weight="bold"
              color="#F5B6D8"
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: "clamp(20px, 5.5vw, 24px)",
                lineHeight: 1.15,
                fontStyle: "italic",
              }}
            >
              Your Undertone is {state?.undertone || "Unknown"}
            </Text>
            <Text
              color="rgba(255,255,255,0.85)"
              margin={{ top: "medium" }}
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: "clamp(13px, 2vw, 16px)",
                maxWidth: "460px",
                lineHeight: 1.6,
              }}
            >
              Your personalized color palette is here! 
            </Text>
          </Box>

          <GlassCard pad={isSmall ? "14px" : "20px"}>
            <Box direction="row" justify="between" align="center" wrap gap="6px">
              <Box direction="row" align="center" gap="6px">
                <Text size="20px" weight="bold" color="white" style={{ fontFamily: FONT_FAMILY }}>
                  Your Best Colors
                </Text>
                <img
                  src={HeartIcon}
                  alt="heart"
                  style={{
                    width: "20px",
                    height: "20px",
                    display: "block",
                    marginLeft: 4,
                    filter: "invert(79%) sepia(11%) saturate(523%) hue-rotate(301deg) brightness(1)",
                  }}
                />
              </Box>
              <Text size="11px" color="rgba(255,255,255,0.7)" style={{ fontFamily: FONT_FAMILY }}>
                Click a color to preview
              </Text>
            </Box>
            <SwatchRow
              colors={state?.recommended_colors}
              swatchSize={isSmall ? "44px" : "56px"}
              onSwatchClick={handleSwatchClick}
              selectedHex={selectedSwatch?.hex}
            />
          </GlassCard>
        </Box>
      </Box>

      {/* Your Glow, See the Difference */}
    
      <Box background="rgba(207, 153, 198, 0.1)" style={{ position: "relative", zIndex: 1 }} gap="12px" border={{ color: "rgba(255,255,255,0.18)" }} round="medium" pad={isSmall ? "14px" : "20px"}>
        <Box direction="row" align="center" gap="6px">
          <Text
            weight="bold"
            color="white"
            style={{ fontFamily: FONT_FAMILY, fontSize: "clamp(20px, 3vw, 16px)" }}
          >
            Your Glow, See the Difference
          </Text>
          <img
            src={SparkleIcon}
            alt="sparkle"
            style={{
              width: "20px",
              height: "20px",
              display: "block",
              marginLeft: 4,
              filter: "invert(93%) sepia(86%) saturate(528%) hue-rotate(1deg) brightness(1)",
            }}
          />
        </Box>
        <Box direction="row-responsive" gap="16px">
          <GlassCard style={{ flex: 1, minWidth: 0 }} pad={isSmall ? "14px" : "20px"}>
            <Box direction="row" align="center" gap="xsmall">
              <Close color="#F2A0A0" size="16px" />
              <Text size="13px" weight="bold" color="white" style={{ fontFamily: FONT_FAMILY }}>
                Colors That Overpower You
              </Text>
            </Box>
            <PhotoSwatchRow
              colors={state?.avoid_colors}
              thumbnails={swatchThumbnails}
              loading={thumbnailsLoading}
              swatchSize={isSmall ? "84px" : "104px"}
            />
            <Text size="14px" color="rgba(255,255,255,0.75)" style={{ fontFamily: FONT_FAMILY, lineHeight: 1.4 }}>
              These colors can wash you out and make you look dull or tired.
            </Text>
          </GlassCard>
          <GlassCard style={{ flex: 1, minWidth: 0 }} pad={isSmall ? "14px" : "20px"}>
            <Box direction="row" align="center" gap="xsmall">
              <Checkmark color="#A0E2B8" size="16px" />
              <Text size="16px" weight="bold" color="white" style={{ fontFamily: FONT_FAMILY }}>
                Colors That Enhance You
              </Text>
            </Box>
            <PhotoSwatchRow
              colors={state?.recommended_colors?.slice(0, 4)}
              thumbnails={swatchThumbnails}
              loading={thumbnailsLoading}
              swatchSize={isSmall ? "84px" : "104px"}
            />
            <Text size="14px" color="rgba(255,255,255,0.75)" style={{ fontFamily: FONT_FAMILY, lineHeight: 1.4 }}>
              These colors brighten your face and bring out your natural glow.
            </Text>
          </GlassCard>
        </Box>
      </Box>

      {/* How I Use My Colors */}
      <Box
        background="rgba(207, 153, 198, 0.1)"
        style={{ position: "relative", zIndex: 1 }}
        gap="12px"
        border={{ color: "rgba(255,255,255,0.18)" }}
        round="medium"
        pad={isSmall ? "14px" : "20px"}
      >
        <Box direction="row" align="center" gap="6px">
          <Text
            weight="bold"
            color="white"
            style={{ fontFamily: FONT_FAMILY, fontSize: "clamp(16px, 3vw, 20px)" }}
          >
            How I Use My Colors
          </Text>
          <div
            aria-hidden
            style={{
              width: "20px",
              height: "20px",
              display: "block",
              marginLeft: 4,
              background: "linear-gradient(90deg,#ff4d4d,#ffb84d,#fff44d,#7dff4d,#4ddfff,#4d6bff,#b84dff)",
              WebkitMaskImage: `url(${swatchIcon})`,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskImage: `url(${swatchIcon})`,
              maskRepeat: "no-repeat",
              maskSize: "contain",
            }}
          />
        </Box>
        <Box direction="row-responsive" gap="16px">
          <GlassCard style={{ flex: 1, minWidth: 0 }} pad={isSmall ? "14px" : "20px"}>
            <Text size="16px" weight="bold" color="white" style={{ fontFamily: FONT_FAMILY }}>
              Hijab Colors
            </Text>
            <SwatchRow colors={state?.recommended_colors} swatchSize={isSmall ? "36px" : "44px"} shape="full" />
            <Text size="14px" color="rgba(255,255,255,0.75)" style={{ fontFamily: FONT_FAMILY, lineHeight: 1.4 }}>
              These shades are perfect for your hijabs and bring harmony to your overall look.
            </Text>
          </GlassCard>
          <GlassCard style={{ flex: 1, minWidth: 0 }} pad={isSmall ? "14px" : "20px"}>
            <Text size="16px" weight="bold" color="white" style={{ fontFamily: FONT_FAMILY }}>
              Neutrals I Love
            </Text>
            <SwatchRow colors={state?.neutral_colors} swatchSize={isSmall ? "36px" : "44px"} shape="full" />
            <Text size="14px" color="rgba(255,255,255,0.75)" style={{ fontFamily: FONT_FAMILY, lineHeight: 1.4 }}>
              Warm neutrals are perfect base colors for easy matching and everyday styling.
            </Text>
          </GlassCard>
        </Box>
      </Box>
       <Box
        background="rgba(207, 153, 198, 0.1)"
        style={{ position: "relative", zIndex: 1 }}
        gap="12px"
        border={{ color: "rgba(255,255,255,0.18)" }}
        round="medium"
        pad={isSmall ? "14px" : "20px"}
      >
        <Box pad={{ horizontal: "small" }} gap="small">
          <Text weight="bold" color="rgba(255,255,255,0.75)"  size="medium" style={{ fontFamily: FONT_FAMILY }}>💡 Why These Colors Work For You</Text>
          <Text style={{ fontFamily: FONT_FAMILY, marginTop: "8px 0" }} size="14px" color="rgba(255,255,255,0.75)" >
            As a <strong>{state?.season}</strong> with <strong>{state?.undertone}</strong> undertones,
            your skin has natural {state?.undertone === "warm" ? "golden and peachy" : state?.undertone === "cool" ? "pink and rosy" : "balanced"} tones.
            The colors recommended above harmonize with your natural coloring, making you look radiant and balanced.
          </Text>

          {state?.undertone === "warm" && (
            <Text style={{ fontFamily: FONT_FAMILY, marginTop: "8px 0" }} size="14px" color="rgba(255,255,255,0.75)" >☀️ Warm undertones are complemented by earthy, golden hues. Avoid cool blues and silvers as they can clash with your natural warmth.</Text>
          )}

          {state?.undertone === "cool" && (
            <Text style={{ fontFamily: FONT_FAMILY, marginTop: "8px 0" }} size="14px" color="rgba(255,255,255,0.75)" >❄️ Cool undertones shine in jewel tones and icy colors. Avoid warm oranges and golds as they can make your complexion look tired.</Text>
          )}

          {state?.undertone === "neutral" && (
            <Text style={{ fontFamily: FONT_FAMILY, marginTop: "8px 0" }} size="14px" color="rgba(255,255,255,0.75)" >⚖️ Neutral undertones are versatile! You can wear both warm and cool colors, but look best in soft, muted tones that don't overwhelm your natural balance.</Text>
          )}
        </Box>
      </Box>


      {/* Avoid + Tip */}
      <Box background="rgba(207, 153, 198, 0.1)" style={{ position: "relative", zIndex: 1 }} gap="12px" border={{ color: "rgba(255,255,255,0.18)" }} round="medium" pad={isSmall ? "14px" : "20px"}>
      <Box direction="row-responsive" gap="16px" style={{ position: "relative", zIndex: 1 }}>
        <GlassCard style={{ flex: 1, minWidth: 0 }} pad={isSmall ? "14px" : "20px"}>
          <Box direction="row" align="center" gap="8px">
                <img
                  src={crossIcon}
                  alt="cross"
                  style={{
                    width: "20px",
                    height: "20px",
                    display: "block",
                    marginRight: 6,
                    /* tint to red (#ff4d4d) */
                    filter: "invert(19%) sepia(94%) saturate(5430%) hue-rotate(358deg) brightness(98%) contrast(105%)",
                  }}
                />
            <Text size="20px" weight="bold" color="white" style={{ fontFamily: FONT_FAMILY }}>
              Avoid These
            </Text>
          </Box>
          <SwatchRow colors={state?.avoid_colors} swatchSize={isSmall ? "30px" : "36px"} shape="full" />
        </GlassCard>
        <GlassCard style={{ flex: 1, minWidth: 0 }} pad={isSmall ? "14px" : "20px"}>
          <Text size="16px" weight="bold" color="white" style={{ fontFamily: FONT_FAMILY }}>
            💡 My Color Tip
          </Text>
          <Text size="14px" color="rgba(255,255,255,0.85)" style={{ fontFamily: FONT_FAMILY, lineHeight: 1.5 }}>
            When in doubt, choose warm, light, and clear colors. They bring out the best version of you!
          </Text>
        </GlassCard>
      </Box>
      </Box>

     
      {/* Footer CTA */}
      <Box
        direction="row-responsive" justify="between" align="center" gap="medium"
        style={{
          position: "relative", zIndex: 1,
          background: "rgba(255,255,255,0.12)", borderRadius: "18px",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
        pad={isSmall ? "16px" : "medium"}
      >
        <Box>
          <Text
            weight="bold"
            color="white"
            style={{ fontFamily: FONT_FAMILY, fontSize: "clamp(16px, 3.4vw, 20px)" }}
          >
            Your colors. Your confidence. Your best you.
          </Text>
          <Text size="14px" color="rgba(255,255,255,0.8)" style={{ fontFamily: FONT_FAMILY }}>
            Wear what makes you glow, every day.
          </Text>
        </Box>
        <Button
          icon={<Refresh color="#6B2D8B" size="16px" />}
          label={<Text size="small" weight="bold" color="#6B2D8B" style={{ fontFamily: FONT_FAMILY }}>Analyze Another Photo</Text>}
          style={{ borderRadius: "999px" }}
          primary
          color="white"
          pad={{ horizontal: "medium", vertical: "small" }}
          onClick={() => navigate("/analyze")}
        />
      </Box>

      {/* Trust footer */}
      <Box
        direction="row-responsive"
        wrap
        justify="around"
        gap="medium"
        style={{ position: "relative", zIndex: 1 }}
        pad={{ vertical: "small" }}
      >
        <TrustBadge Icon={Camera} label="Your Privacy Matters" sub="Photo analyzed securely & deleted after processing" />
        <TrustBadge Icon={Download} label="100% Private" sub="We never store or share your photos" />
        <TrustBadge Icon={Checkmark} label="Made for You" sub="Personalized colors, just for your unique beauty" />
      </Box>

      {/* Email modal */}
      {showEmailForm && (
        <Layer
          onEsc={() => setShowEmailForm(false)}
          onClickOutside={() => setShowEmailForm(false)}
          modal
          responsive
        >
          <Box
            pad="large"
            gap="medium"
            width={isSmall ? "auto" : "medium"}
            round="medium"
            background="white"
            elevation="medium"
          >
            <Text size="xlarge" weight="bold" color="#7A4B8A" style={{ fontFamily: FONT_FAMILY }}>
              Email Your Results
            </Text>
            {!emailSent ? (
              <Form onSubmit={({ value }) => handleEmailSubmit(value)}>
                <FormField
                  name="email"
                  label="Email Address"
                  required
                  validate={(val) => (/\S+@\S+\.\S+/.test(val) ? undefined : "Enter a valid email")}
                >
                  <TextInput name="email" type="email" placeholder="your@email.com" />
                </FormField>
                {emailError && (
                  <Text size="small" color="status-error" margin={{ top: "xsmall" }}>{emailError}</Text>
                )}
                <Box direction="row" justify="between" margin={{ top: "medium" }}>
                  <Button label="Cancel" onClick={() => setShowEmailForm(false)} secondary />
                  <Button type="submit" label="Send" icon={<MailOption />} primary color="#7A4B8A" />
                </Box>
              </Form>
            ) : (
              <Box align="center" gap="small" pad="medium">
                <Text color="status-ok" size="xxlarge">✓</Text>
                <Text size="medium" weight="bold">Email Sent!</Text>
                <Text size="small" color="dark-5">Check your inbox for your results</Text>
              </Box>
            )}
          </Box>
        </Layer>
      )}
    </Box>
    
  );
};

export default Results;