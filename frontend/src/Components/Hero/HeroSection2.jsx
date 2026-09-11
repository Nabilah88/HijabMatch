
import HeartIcon         from "../../assets/heart.png";
import SeasonIconSvg        from "../../assets/season-analysis.png";
import ColorPaletteIconSvg  from "../../assets/color-palette2.png";
import learnIcon            from "../../assets/learnIcon.svg"


import modelPhoto from "../../assets/halima.png";

import { useState } from "react";
import { Box, Text, Button, Grommet } from "grommet";
import { Link } from "react-router-dom";

// ─── ICON WRAPPER ─────────────────────────────────────────────────────────────

const Icon = ({ src, alt = "", width = 24, height = 24 }) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    style={{ display: "block", flexShrink: 0 }}
  />
);

// ─── COLOR SWATCH DATA ────────────────────────────────────────────────────────
// Replace hex values with the actual colors from your backend results.

const bestMatchColors   = ["#FF7043", "#FDD835", "#00E5FF", "#FFCC99", "#B0C4DE"];
const lessEnhancingColors = ["#111111", "#FFFFFF", "#0D1B6E"];

// ─── COLOR SWATCH ROW ─────────────────────────────────────────────────────────

const SwatchRow = ({ colors, label }) => (
  <Box gap="8px">
    <Text size="13px" color="rgba(255,255,255,0.7)" weight={500}>
      {label}
    </Text>
    <Box direction="row" gap="8px" wrap>
      {colors.map((color) => (
        <Box
          key={color}
          width="32px"
          height="32px"
          style={{
            borderRadius: "10px",
            background: color,
            border: color === "#FFFFFF"
              ? "2px solid rgba(255,255,255,0.35)"
              : "2px solid rgba(255,255,255,0.15)",
            flexShrink: 0,
            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
          }}
        />
      ))}
    </Box>
  </Box>
);

// ─── FEATURE CHIP ─────────────────────────────────────────────────────────────

const FeatureChip = ({ iconSrc, iconAlt, label, hovered, onEnter, onLeave }) => (
  <Box
    direction="row"
    align="center"
    gap="10px"
    pad={{ vertical: "12px", horizontal: "18px" }}
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
    style={{
      background: hovered ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.13)",
      border: "1.5px solid rgba(255,255,255,0.3)",
      borderRadius: "50px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      userSelect: "none",
    }}
  >
    <Icon src={iconSrc} alt={iconAlt} width={22} height={22} />
    <Text size="13px" weight={700} color="white">{label}</Text>
  </Box>
);

// ─── RESULTS CARD ─────────────────────────────────────────────────────────────

const ResultsCard = () => (
  <Box
    style={{
      maxWidth:"380px",
      background: "rgba(80, 20, 60, 0.55)",
      backdropFilter: "blur(18px)",
      borderRadius: "18px",
      border: "1px solid rgba(255,255,255,0.18)",
      boxShadow: "0 28px 72px rgba(0,0,0,0.22)",
      overflow: "hidden",
    }}
    pad="20px"
    gap="15px"
  >
    {/* Card title */}
    <Box direction="row" align="center" gap="10px">
      <Text
        size="18px"
        weight={700}
        color="#ffffff"
      >
        Your Perfect Hijab Colors
      </Text>
      <Icon src={HeartIcon} alt="heart" width={20} height={20} />
    </Box>

    {/* Swatch sections */}
    <SwatchRow colors={bestMatchColors}    label="Best Matches" />
    <SwatchRow colors={lessEnhancingColors} label="Less Enhancing" />

   <Box
  style={{
    borderRadius: "14px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",     // ← FIXED (colon instead of equals)
    justifyContent: "center",
    position: "relative",     // ← needed for the badge overlay
  }}
>
  <img
    src={modelPhoto}
    alt="Light Spring skintone model"
    style={{
      width: "80%",
      maxHeight: "240px",
      objectFit: "contain",   // ← correct way to use "contain"
    }}
  />

  {/* Season badge overlay */}
  <Box
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      background: "rgba(80, 20, 60, 0.82)",
      padding: "10px 16px",
    }}
    align="center"
  >
    <Text size="15px" weight={600} color="white">Light Spring</Text>
  </Box>
</Box>

  </Box>
);

// ─── HERO SECTION 2 ───────────────────────────────────────────────────────────

const HeroSection2 = () => {
  const [hoveredChip, setHoveredChip] = useState(null);
  const [learnHovered, setLearnHovered] = useState(false);

  return (
    <Box
      direction="row-responsive"
      align="center"
      justify="between"
      gap="48px"
      pad={{ horizontal: "60px", vertical: "64px" }}
      style={{
        background: "linear-gradient(180deg, #9e466fff 0%, #a06ab8ff 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      
      <Box style={{
        position: "absolute", top: "-100px", right: "-100px",
        width: "420px", height: "420px", borderRadius: "50%",
        background: "rgba(255,255,255,0.05)", pointerEvents: "none",
      }} />
      <Box style={{
        position: "absolute", bottom: "-80px", left: "25%",
        width: "300px", height: "300px", borderRadius: "50%",
        background: "rgba(255,255,255,0.04)", pointerEvents: "none",
      }} />

      {/* ── LEFT: Text Content ── */}
      <Box flex="grow" style={{ maxWidth: "500px", position: "relative", zIndex: 1 }}>

        {/* Headline */}
        <Text
          size="48px"
          weight={500}
          style={{

            lineHeight: 1.1,
            letterSpacing: "-1px",
          }}
        >
          <span style={{ color: "white" }}>Personalized </span>
          <span style={{ color: "#C084FC" }}>Color</span>
          {"\n"}
          <span style={{ color: "#C084FC" }}>Recommendations</span>
        </Text>

        {/* Body */}
        <Text
          size="17px"
          color="rgba(255,255,255,0.85)"
          margin={{ top: "22px", bottom: "36px" }}
          style={{ lineHeight: 1.7, maxWidth: "420px" }}
        >
          Find out your recommended hijab colors, which colors to embrace,
          and which to avoid.
        </Text>

        {/* Primary CTA */}
        <Box margin={{ bottom: "28px" }}>
          <Button
            as={Link}
            to="/#first_feature"
            label={
              <Box direction="row" align="center" gap="10px">
                <Icon src={learnIcon} alt="" width={20} height={20} />
                <Text size="15px" weight={700} color="white">Learn More</Text>
              </Box>
            }
            onMouseEnter={() => setLearnHovered(true)}
            onMouseLeave={() => setLearnHovered(false)}
            style={{
              background: learnHovered
                ? "rgb(177, 39, 165)"
                : "rgb(110, 23, 122)",
              border: "2px solid rgba(255,255,255,0.45)",
              borderRadius: "50px",
              padding: "14px 36px",
              width: "fit-content",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: learnHovered ? "0 8px 24px rgba(0,0,0,0.2)" : "none",
            }}
          />
        </Box>

        {/* Feature chips */}
        <Box direction="row" gap="12px" wrap>
          <FeatureChip
            iconSrc={SeasonIconSvg}
            iconAlt="season analysis"
            label="Seasonal Skin Tone Analysis"
            hovered={hoveredChip === "season"}
            onEnter={() => setHoveredChip("season")}
            onLeave={() => setHoveredChip(null)}
          />
          <FeatureChip
            iconSrc={ColorPaletteIconSvg}
            iconAlt="color palette"
            label="Curated Hijab Colors"
            hovered={hoveredChip === "palette"}
            onEnter={() => setHoveredChip("palette")}
            onLeave={() => setHoveredChip(null)}
          />
        </Box>
      </Box>

      {/* ── RIGHT: Results Card ── */}
      <Box flex="grow" style={{ maxWidth: "500px", position: "relative", zIndex: 1 }}>
        <ResultsCard />
      </Box>
    </Box>
  );
};

export default HeroSection2;
