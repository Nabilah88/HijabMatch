
import confidentIcon         from "../../assets/confident.png";
import enhanceIcon        from "../../assets/enhance.png";
import arrowIcon            from "../../assets/arrow.svg"



import modelPhoto from "../../assets/confident_girl_hijab.png";

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
      background: "rgba(255,255,255,0.12)",
      backdropFilter: "blur(18px)",
      borderRadius: "22px",
      border: "1px solid rgba(255,255,255,0.18)",
      boxShadow: "0 28px 72px rgba(0,0,0,0.22)",
      overflow: "hidden",
    }}
    pad="28px"
    gap="20px"
  >
 

    <Box style={{ position: "relative", borderRadius: "14px", overflow: "hidden" }}>
    
      <img
        src={modelPhoto}
        alt="confident girl"
        style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: "640px" }}
      />

    </Box>
  </Box>
);

// ─── HERO SECTION 3 ───────────────────────────────────────────────────────────

const HeroSection3 = () => {
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
        background: "linear-gradient(180deg, rgba(255,182,193,0.3), rgba(128,0,128,0.6))",
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
          <span style={{ color: "white" }}>Feel More </span>
          <span style={{ color: "#F48FB1" }}>Confident in</span>
          {"\n"}
          <span style={{ color: "#F48FB1" }}>Your Color Choices</span>
        </Text>

        {/* Body */}
        <Text
          size="17px"
          color="rgba(255,255,255,0.85)"
          margin={{ top: "22px", bottom: "36px" }}
          style={{ lineHeight: 1.7, maxWidth: "420px" }}
        >
          Discover shades that enhance your beauty.
        </Text>

        {/* Primary CTA */}
        <Box margin={{ bottom: "28px" }}>
          <Button
            as={Link}
            to="/analyze"
            label={
              <Box direction="row" align="center" gap="10px">
                <Icon src={arrowIcon} alt="" width={20} height={20} />
                <Text size="15px" weight={700} color="white">Try Now</Text>
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
            iconSrc={confidentIcon}
            iconAlt="confident"
            label="Confidence"
            hovered={hoveredChip === "confident"}
            onEnter={() => setHoveredChip("confident")}
            onLeave={() => setHoveredChip(null)}
          />
          <FeatureChip
            iconSrc={enhanceIcon}
            iconAlt="enhancing"
            label="Enhance Features"
            hovered={hoveredChip === "enhance"}
            onEnter={() => setHoveredChip("emhance")}
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

export default HeroSection3;
