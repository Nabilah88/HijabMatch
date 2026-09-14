
import sparkleIcon       from "../../assets/spakling.svg";
import cameraIcon        from "../../assets/camera.svg";
import lightbulbIcon     from "../../assets/light_bulb.svg"



import modelPhoto from "../../assets/hijab_ladies.jpg";

import { useState } from "react";
import { Box, Text, Button, Grommet } from "grommet";
import { Sparkles } from 'lucide-react'

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
        alt="confident girls"
        style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: "640px" }}
      />

    </Box>
  </Box>
);



const First_feature = () => {
 

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
      id="first_feature"

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
      <Box style={{ maxWidth: "500px", position: "relative", zIndex: 1 }}>
        <Box
    direction="row"
    align="center"
    gap="10px"
    pad={{ vertical: "6px", horizontal: "10px" }}
    width="fit-content"
    style={{
      background: "rgba(124, 71, 107, 0.55)",
      border: "1.5px solid rgba(255,255,255,0.3)",
      borderRadius: "18px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      userSelect: "none",
    }}
  >
    <Sparkles size={12} />
    <Text
      size="xsmall"
      style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
      color="white"
    >
      Feature 01
    </Text>
  </Box>

        {/* Headline */}
        <Text
          size="32px"
          weight={500}
          style={{

            lineHeight: 1.1,
            letterSpacing: "-1px",
          }}
        >
          <span style={{ color: "white" }}>AI-Powered </span>
          <span style={{ color: "#F48FB1" }}>Skin Tone</span>
          {"\n"}
          <span style={{ color: "#F48FB1" }}>Analysis</span>
        </Text>

        {/* Body */}
        <Text
          size="17px"
          color="rgba(255,255,255,0.85)"
          margin={{ top: "22px", bottom: "36px" }}
          style={{ lineHeight: 1.7, maxWidth: "420px" }}
        >
          Upload a selfie and our AI analyzes your skin tone to identify your undertone-- warm, cool, or neutral.
          Get hijab colors that make you brighte, radiant and confident.
        </Text>
         <Box gap="14px" margin={{ bottom: "36px" }}>
                  <Badge
                    iconSrc={sparkleIcon}
                    iconAlt="Features"
                    label="Detects warm, cool, & neutral undertones"
                    sublabel="AI analyzes subtle tones in your skin for your accuracy"
                  />
                  <Badge
                    iconSrc={cameraIcon }
                    iconAlt="AI powered"
                    label="Analayzes from just one selfie"
                    sublabel="Quick, easy and private. Your photo is secure"
                  />
                   <Badge
                    iconSrc={lightbulbIcon}
                    iconAlt="It works"
                    label="Works in any lighting"
                    sublabel="Accurate results on natural or indoor lighting"
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

export default First_feature;
