import React, { useState, useContext } from "react";
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

const API_BASE = "https://hijabmatch-backend.onrender.com";
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

const ComparisonVisual = ({ imageSrc, overlayColor, label, IconComponent, iconColor, maxHeight, alt }) => (
  <Box
    style={{
      position: "relative",
      borderRadius: "14px",
      overflow: "hidden",
      background: "rgba(255,255,255,0.06)",
    }}
  >
    {imageSrc ? (
      <img
        src={imageSrc}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          maxHeight,
          maxWidth: "220px",
          objectFit: "cover",
          objectPosition: "center top",
          display: "block",
          margin: "0 auto",
        }}
      />
    ) : (
      <Box align="center" justify="center" style={{ height: maxHeight, width: "100%", background: "rgba(255,255,255,0.08)" }}>
        <Text size="small" color="white" style={{ fontFamily: FONT_FAMILY }}>
          Your photo will appear here
        </Text>
      </Box>
    )}

    <Box
      style={{
        position: "absolute",
        inset: 0,
        background: overlayColor,
        mixBlendMode: "multiply",
        opacity: 0.55,
      }}
    />

    <Box
      direction="row"
      align="center"
      gap="xsmall"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(80, 20, 60, 0.8)",
        padding: "10px 12px",
      }}
    >
      <IconComponent color={iconColor} size="16px" />
      <Text size="12px" weight="bold" color="white" style={{ fontFamily: FONT_FAMILY }}>
        {label}
      </Text>
    </Box>
  </Box>
);

const HijabMatchResult = () => {
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
    state?.image_url ? `${API_BASE}${state.image_url}` : null
  );
  const [isRecoloring, setIsRecoloring] = useState(false);
  const [recolorError, setRecolorError] = useState(null);

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

    if (!state?.analysis_id) {
      setRecolorError("Missing analysis — try analyzing your photo again.");
      return;
    }

    setIsRecoloring(true);
    try {
      const res = await fetch(`${API_BASE}/api/recolor-swatches/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          analysis_id: state.analysis_id,
          target_color: color.hex,
        }),
      });
      if (!res.ok) throw new Error("Recolor failed");
      const data = await res.json();
      setDisplayedPhotoUrl(data.recolored_image);
    } catch (err) {
      setRecolorError("Could not preview that color — try again.");
    } finally {
      setIsRecoloring(false);
    }
  };

  const handleResetPhoto = () => {
    setSelectedSwatch(null);
    setDisplayedPhotoUrl(state?.image_url ? `${API_BASE}${state.image_url}` : null);
    setRecolorError(null);
  };

  // ---- Responsive tokens ----
  const outerPad = isSmall
    ? { horizontal: "18px", vertical: "24px" }
    : size === "medium"
    ? { horizontal: "36px", vertical: "32px" }
    : { horizontal: "60px", vertical: "40px" };

  const sectionGap = isSmall ? "18px" : "24px";
  const heroImgMaxHeight = isSmall ? "260px" : "340px";
  const mainImageWidth = isSmall ? "72%" : "80%";
  const portraitFrameMaxWidth = isSmall ? "220px" : "260px";

  return (
    <Box
      style={{
        background: "linear-gradient(180deg, rgba(255,182,193,0.3), rgba(128,0,128,0.6))",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: FONT_FAMILY,
      }}
      pad={outerPad}
      gap={sectionGap}
    >
      {/* decorative background circles */}
      <Box
        style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "rgba(255,255,255,0.05)", pointerEvents: "none",
        }}
      />
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
        <Box direction="row" wrap gap="medium">
          <Button
            icon={<Camera color="white" size="16px" />}
            label={
              <Text size="small" color="white" style={{ fontFamily: FONT_FAMILY, whiteSpace: "nowrap" }}>
                {isSmall ? "Retake" : "Analyze Another Photo"}
              </Text>
            }
            style={{ border: "1px solid rgba(255,255,255,0.5)", borderRadius: "999px" }}
            plain
            pad={{ horizontal: "medium", vertical: "small" }}
            onClick={() => navigate("/")}
          />
          <Button
            icon={<MailOption color="#6B2D8B" size="16px" />}
            label={
              <Text size="small" weight="bold" color="#6B2D8B" style={{ fontFamily: FONT_FAMILY, whiteSpace: "nowrap" }}>
                {isSmall ? "Email" : "Email My Results"}
              </Text>
            }
            style={{ borderRadius: "999px" }}
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
              style={{
                borderRadius: "14px",
                overflow: "hidden",
                position: "relative",
                width: mainImageWidth,
                maxWidth: portraitFrameMaxWidth,
                margin: "0 auto",
                aspectRatio: "3 / 4",
              }}
              align="center"
              justify="center"
            >
              {displayedPhotoUrl ? (
                <img
                  src={displayedPhotoUrl}
                  alt="Your upload"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                    borderRadius: "12px",
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
              <Box
                style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "rgba(80, 20, 60, 0.82)", padding: "10px 16px",
                }}
                align="center"
              >
                <Text size="15px" weight={600} color="white" style={{ fontFamily: FONT_FAMILY }}>
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
              style={{ fontFamily: FONT_FAMILY, fontSize: "clamp(15px, 2.4vw, 18px)" }}
            >
              Hi, {state?.name || "there"}! 👋
            </Text>
            <Text
              weight="bold"
              color="white"
              style={{ fontFamily: FONT_FAMILY, fontSize: "clamp(24px, 5.5vw, 34px)", lineHeight: 1.15 }}
            >
              I Know My Colors,
            </Text>
            <Text
              weight="bold"
              color="#F5B6D8"
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: "clamp(24px, 5.5vw, 34px)",
                lineHeight: 1.15,
                fontStyle: "italic",
              }}
            >
              I Wear My Best ♡
            </Text>
            <Text
              color="rgba(255,255,255,0.85)"
              margin={{ top: "small" }}
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: "clamp(13px, 2vw, 16px)",
                maxWidth: "460px",
                lineHeight: 1.6,
              }}
            >
              Your personalized color palette is here! These colors brighten your natural
              beauty and bring out your healthy, radiant glow.
            </Text>
          </Box>

          <GlassCard pad={isSmall ? "14px" : "20px"}>
            <Box direction="row" justify="between" align="center" wrap gap="6px">
              <Text size="14px" weight="bold" color="white" style={{ fontFamily: FONT_FAMILY }}>
                ✨ Your Best Colors
              </Text>
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
      <Box style={{ position: "relative", zIndex: 1 }} gap="12px">
        <Text
          weight="bold"
          color="white"
          style={{ fontFamily: FONT_FAMILY, fontSize: "clamp(15px, 3vw, 16px)" }}
        >
          ✨ Your Glow, See the Difference
        </Text>
        <Box direction="row-responsive" gap="16px">
          <GlassCard style={{ flex: 1, minWidth: 0 }} pad={isSmall ? "14px" : "20px"}>
            <ComparisonVisual
              imageSrc={displayedPhotoUrl}
              overlayColor="#F2A0A0"
              label="Colors That Overpower You"
              IconComponent={Close}
              iconColor="#F2A0A0"
              maxHeight={heroImgMaxHeight}
              alt="Your image swatches with overpowering colors"
            />
            <SwatchRow colors={state?.avoid_colors} swatchSize={isSmall ? "40px" : "48px"} />
            <Text size="11px" color="rgba(255,255,255,0.75)" style={{ fontFamily: FONT_FAMILY, lineHeight: 1.4 }}>
              These colors can wash you out and make you look dull or tired.
            </Text>
          </GlassCard>

          <GlassCard style={{ flex: 1, minWidth: 0 }} pad={isSmall ? "14px" : "20px"}>
            <ComparisonVisual
              imageSrc={displayedPhotoUrl}
              overlayColor="#A0E2B8"
              label="Colors That Enhance You"
              IconComponent={Checkmark}
              iconColor="#A0E2B8"
              maxHeight={heroImgMaxHeight}
              alt="Your image swatches with enhancing colors"
            />
            <SwatchRow colors={state?.recommended_colors?.slice(0, 4)} swatchSize={isSmall ? "40px" : "48px"} />
            <Text size="11px" color="rgba(255,255,255,0.75)" style={{ fontFamily: FONT_FAMILY, lineHeight: 1.4 }}>
              These colors brighten your face and bring out your natural glow.
            </Text>
          </GlassCard>
        </Box>
      </Box>

      {/* How I Use My Colors */}
      <Box style={{ position: "relative", zIndex: 1 }} gap="12px">
        <Text
          weight="bold"
          color="white"
          style={{ fontFamily: FONT_FAMILY, fontSize: "clamp(15px, 3vw, 16px)" }}
        >
          ✨ How I Use My Colors
        </Text>
        <Box direction="row-responsive" gap="16px">
          <GlassCard style={{ flex: 1, minWidth: 0 }} pad={isSmall ? "14px" : "20px"}>
            <Text size="13px" weight="bold" color="white" style={{ fontFamily: FONT_FAMILY }}>
              Hijab Colors
            </Text>
            <SwatchRow colors={state?.recommended_colors} swatchSize={isSmall ? "36px" : "44px"} shape="full" />
            <Text size="11px" color="rgba(255,255,255,0.75)" style={{ fontFamily: FONT_FAMILY, lineHeight: 1.4 }}>
              These shades are perfect for your hijabs and bring harmony to your overall look.
            </Text>
          </GlassCard>
          <GlassCard style={{ flex: 1, minWidth: 0 }} pad={isSmall ? "14px" : "20px"}>
            <Text size="13px" weight="bold" color="white" style={{ fontFamily: FONT_FAMILY }}>
              Neutrals I Love
            </Text>
            <SwatchRow colors={state?.neutral_colors} swatchSize={isSmall ? "36px" : "44px"} shape="full" />
            <Text size="11px" color="rgba(255,255,255,0.75)" style={{ fontFamily: FONT_FAMILY, lineHeight: 1.4 }}>
              Warm neutrals are perfect base colors for easy matching and everyday styling.
            </Text>
          </GlassCard>
        </Box>
      </Box>

      {/* Avoid + Tip */}
      <Box direction="row-responsive" gap="16px" style={{ position: "relative", zIndex: 1 }}>
        <GlassCard style={{ flex: 1, minWidth: 0 }} pad={isSmall ? "14px" : "20px"}>
          <Text size="13px" weight="bold" color="white" style={{ fontFamily: FONT_FAMILY }}>
            ✕ Avoid These
          </Text>
          <SwatchRow colors={state?.avoid_colors} swatchSize={isSmall ? "30px" : "36px"} shape="full" />
        </GlassCard>
        <GlassCard style={{ flex: 1, minWidth: 0 }} pad={isSmall ? "14px" : "20px"}>
          <Text size="13px" weight="bold" color="white" style={{ fontFamily: FONT_FAMILY }}>
            💡 My Color Tip
          </Text>
          <Text size="12px" color="rgba(255,255,255,0.85)" style={{ fontFamily: FONT_FAMILY, lineHeight: 1.5 }}>
            When in doubt, choose warm, light, and clear colors. They bring out the best version of you!
          </Text>
        </GlassCard>
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
            style={{ fontFamily: FONT_FAMILY, fontSize: "clamp(15px, 3.4vw, 18px)" }}
          >
            Your colors. Your confidence. Your best you.
          </Text>
          <Text size="12px" color="rgba(255,255,255,0.8)" style={{ fontFamily: FONT_FAMILY }}>
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
          onClick={() => navigate("/")}
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

export default HijabMatchResult;
