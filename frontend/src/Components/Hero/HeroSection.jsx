
import ShieldIconSvg    from "../../assets/shield.svg";
import AIIconSvg        from "../../assets/ai-powered.svg";
import SparkleSvg       from "../../assets/sparkles.svg";
import galaxyStar from "../../assets/galaxy_star.svg"
import PlaySvg          from "../../assets/play.svg";
import CheckSvg         from "../../assets/check.svg";
import CrossSvg         from "../../assets/cross.svg";

import flatteringImg    from "../../assets/lady.jpg";
import lessFlatteringImg from "../../assets/lady.jpg";

import { useState } from "react";
import { Box, Text, Button, Grid, Grommet } from "grommet";
import { Link } from "react-router-dom";




const Icon = ({ src, alt = "", width = 28, height = 28 }) => (
  <img src={src} alt={alt} width={width} height={height} style={{ display: "block" }} />
);

// ─── COLOR SWATCHES ───────────────────────────────────────────────────────────


const flatteringColors    = ["#F4A7B9", "#E57373", "#80DEEA", "#FFD54F", "#A5D6A7"];
const lessFlatteringColors = ["#212121", "#1A237E"];

const ColorSwatches = ({ colors }) => (
  <Box direction="row" gap="6px" pad={{ top: "8px" }}>
    {colors.map((color) => (
      <Box
        key={color}
        width="30px"
        height="30px"
        style={{
          borderRadius: "6px",
          background: color,
          border: "2px solid rgba(255,255,255,0.6)",
          flexShrink: 0,
        }}
      />
    ))}
  </Box>
);

// ─── TRUST BADGE ──────────────────────────────────────────────────────────────

const Badge = ({ iconSrc, iconAlt, label, sublabel }) => (
  <Box direction="row" align="center" gap="10px">
    <Box
      width="40px"
      height="40px"
      align="center"
      justify="center"
      background="rgba(255,255,255,0.15)"
      style={{ borderRadius: "10px", flexShrink: 0 }}
    >
      <Icon src={iconSrc} alt={iconAlt} width={24} height={24} />
    </Box>
    <Box>
      <Text size="14px" weight={700} color="white">{label}</Text>
      <Text size="12px" color="rgba(255,255,255,0.75)">{sublabel}</Text>
    </Box>
  </Box>
);

// ─── PHOTO CARD ───────────────────────────────────────────────────────────────

const PhotoCard = ({ src, alt }) => ( 
  <Box
    width="100%"
    height="260px"
    style={{ borderRadius: "8px", overflow: "hidden" }}
  >
    <img
      src={src}
      alt={alt}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  </Box>
);

// ─── RESULTS CARD ─────────────────────────────────────────────────────────────

const ResultsCard = () => (
  <Box
    background="rgba(255,255,255,0.12)"
    style={{
      backdropFilter: "blur(16px)",
      borderRadius: "20px",
      border: "1px solid rgba(255,255,255,0.25)",
      boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
    }}
    pad="24px"
    gap="16px"
  >
    {/* Card header */}
    <Box direction="row" align="center" justify="start" gap="small">
      <Text
        size="32px"
        weight={700}
        color="white"
      >
        AI Color Analysis
      </Text>
      <Icon src={SparkleSvg} alt="sparkle" width={32} height={32} />
    </Box>

    <Text size="16px" color="rgba(255,255,255,0.8)">
      Compare how colors enhance or diminish your natural glow.
    </Text>

    {/* Two-column comparison */}
    <Grid columns={["1fr", "1fr"]} gap="12px">

      {/* ── More Flattering ── */}
      <Box>
        <Box
          direction="row"
          align="center"
          justify="center"
          gap="6px"
          background="#52278a"
          pad={{ vertical: "7px", horizontal: "3px" }}
          style={{ borderRadius: "8px" }}
          margin={{ bottom: "10px" }}
          
        >
          <Icon src={CheckSvg} alt="check" width={18} height={18} />
          <Text size="13px" weight={700} color="white" textAlign="center">More Flattering</Text>
        </Box>
        <PhotoCard src={flatteringImg} alt="More flattering hijab color example" />
        <ColorSwatches colors={flatteringColors} />
      </Box>

      {/* ── Less Flattering ── */}
      <Box>
        <Box
          direction="row"
          align="center"
          justify="center"
          gap="6px"
          background="#b11242"
          pad={{ vertical: "7px", horizontal: "12px" }}
          style={{ borderRadius: "8px" }}
          margin={{ bottom: "10px" }}
        >
          <Icon src={CrossSvg} alt="cross" width={18} height={18} />
          <Text size="13px" weight={700} color="white">Less Flattering</Text>
        </Box>
        <PhotoCard src={lessFlatteringImg} alt="Less flattering hijab color example" />
        <ColorSwatches colors={lessFlatteringColors} />
      </Box>

    </Grid>
  </Box>
);

// ─── HERO SECTION ─────────────────────────────────────────────────────────────

const HeroSection = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      direction="row-responsive"
      align="center"
      justify="between"
      gap="40px"
      pad={{ horizontal: "60px", vertical: "64px" }}
      style={{
        background: "linear-gradient(180deg, rgba(255,182,193,0.3), rgba(128,0,128,0.6))",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background orbs */}
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

      {/* ── LEFT: Text Content ── */}
      <Box flex="grow" style={{ maxWidth: "480px", position: "relative", zIndex: 1 }}>

        <Text
          size="48px"
          weight={500}
          color="white"
          style={{ lineHeight: 1.15, letterSpacing: "-0.5px" }}
        >
          Discover Which Hijab Colors{" "}
          <span style={{ color: "#F48FB1" }}>Brighten Your Complexion</span>
        </Text>

        <Text
          size="16px"
          color="rgba(255,255,255,0.85)"
          margin={{ top: "20px", bottom: "32px" }}
          style={{ lineHeight: 1.65 }}
        >
          Upload a photo and let AI analyze your skin tone, undertone, and contrast
          to find your best hijab colors.
        </Text>

        {/* Trust badges */}
        <Box gap="14px" margin={{ bottom: "36px" }}>
          <Badge
            iconSrc={ShieldIconSvg}
            iconAlt="privacy shield"
            label="100% Privacy"
            sublabel="Your data is safe with us."
          />
          <Badge
            iconSrc={AIIconSvg}
            iconAlt="AI powered"
            label="AI-powered"
            sublabel="Smart and Accurate"
          />
        </Box>

        {/* CTAs */}
        <Box direction="row" align="center" gap="24px" wrap>
          <Button
            label={
              <Box direction="row" align="center" gap="10px">
                <Icon src={galaxyStar} alt="" width={20} height={20} />
                <Text size="15px" weight={700} color="white">Start Analysis</Text>
              </Box>
            }
            as={Link}
            to="/analyze"
    
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              background: hovered ? "rgb(177, 39, 165)" : "rgb(110, 23, 122)",
              border: "2px solid rgba(255,255,255,0.5)",
              borderRadius: "50px",
              padding: "14px 28px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.2)" : "none",
            }}
    
      
          />

          <Button plain          
                  as={Link}
                  to="/#how-it-works">
            <Box direction="row" align="center" gap="10px">
              <Icon src={PlaySvg} alt="play" width={20} height={20} />
              <Text size="15px" weight={700} color="white">How It Works</Text>
            </Box>
   
          </Button>
        </Box>
      </Box>

      {/* ── RIGHT: Results Card ── */}
      <Box flex="grow" style={{ maxWidth: "600px", position: "relative", zIndex: 1 }}>
        <ResultsCard />
      </Box>
    </Box>
  );
};

export default HeroSection;