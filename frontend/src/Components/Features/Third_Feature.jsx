
import hijabIcon       from "../../assets/hijab_tryon.png";
import paletteIcon        from "../../assets/color-palette.png";
import worksIcon     from "../../assets/hijab_works.png"



import modelPhoto from "../../assets/shopping_lady.png";

import { useState } from "react";
import { Box, Text, Button, Heading, Grommet } from "grommet";
import { Palette } from 'lucide-react';


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
        alt="hijab shopping"
        style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: "640px" }}
      />

    </Box>
  </Box>
);

// ─── HERO SECTION 3 ───────────────────────────────────────────────────────────

const Third_feature = () => {
 

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
    <Palette size={12} />
    <Text
      size="xsmall"
      style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
      color="white"
    >
      Feature 03
    </Text>
  </Box>

        {/* Headline */}
       <Heading level={2} margin="none" style={{ lineHeight: "1.1" }}>
        <span style={{ color: "white", display: "block" }}>
          Personalized
        </span>

       <span style={{ color: "#F48FB1", display: "block" }}>
        Hijab Color
       </span>

       <span style={{ color: "#F48FB1", display: "block" }}>
       Recommendations
      </span>
      </Heading>


        {/* Body */}
        <Text
          size="17px"
          color="rgba(255,255,255,0.85)"
          margin={{ top: "22px", bottom: "36px" }}
          style={{ lineHeight: 1.7, maxWidth: "420px" }}
        >
          We determine your personalized hijab colors based on your unique season. Be prepared to have your own hijab color palette and ready to do some hijab shopping.
        </Text>
         <Box gap="14px" margin={{ bottom: "36px" }}>
                  <Badge
                    iconSrc={paletteIcon}
                    iconAlt="color palette"
                    label="Curate your own hijab color palette"
                    sublabel="Curated hijab shades based on the user’s season"
                  />
                  <Badge
                    iconSrc={hijabIcon }
                    iconAlt="earthy tones"
                    label="Adds a touch of elegance by not forgetting multiple tones"
                    sublabel="Includes earthy tones, pastels, bold colors, etc."
                  />
                   <Badge
                    iconSrc={worksIcon}
                    iconAlt="enhancement"
                    label="Colors that enhance your beauty"
                    sublabel="Shows which colors enhance their natural beauty"
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

export default Third_feature;
