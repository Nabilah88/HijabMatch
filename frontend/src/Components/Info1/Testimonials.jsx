import React, { useState } from "react";
import { Box, Image, Text, Button } from "grommet";
import { Previous, Next } from "grommet-icons";
import { Heart } from 'lucide-react';

import halima_hijab from "../../assets/beforeandafter.png";
import example from "../../assets/beforeandafter2.png";
import autumn from "../../assets/beforeandafter3.png";

const testimonials = [
  {
    image: halima_hijab,
    quote:
      "Hijab Match is redefining modest fashion with smart, accurate color guidance.",
    name: "Halima Saleem",
    role: "Verified User",
  },
  {
    image: example,
    quote:
      "I finally understand which colors make me glow! This changed my wardrobe.",
    name: "Amira Webber",
    role: "Verified User",
  },
  {
    image: autumn,
    quote:
      "The AI analysis was spot-on. I get compliments every time I wear my recommended colors!",
    name: "Zainab Ali",
    role: "Verified User",
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((i) => (i + 1) % testimonials.length);
  const prev = () =>
    setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[currentIndex];

  return (
    <Box
      pad="xlarge"
      align="center"
      justify="center"
      background="linear-gradient(180deg, rgba(255,182,193,0.35), rgba(128,0,128,0.55))"
      round="small"
      width="100%"
    >
       <Box
          direction="row"
          align="center"
          gap="10px"
          pad={{ vertical: '12px', horizontal: '18px' }}
          margin={{ bottom: "medium" }}
          style={{
            background: 'rgba(80, 20, 60, 0.55)',
            border: '1.5px solid rgba(255,255,255,0.3)',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            userSelect: 'none',
          }}
        >
          <Heart size={14} />
          <Text size="small" style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }} color="white">
            Testimonials
          </Text>
          <Heart size={14} />
        </Box>
        
    <Box direction="row" gap="xlarge" align="center" justify="center" wrap>

  <Box
    style={{
      background: "rgba(255,255,255,0.12)",
      backdropFilter: "blur(18px)",
      borderRadius: "22px",
      border: "10px solid rgba(255,255,255,0.18)",
      boxShadow: "0 28px 72px rgba(0,0,0,0.22)",
      overflow: "hidden",
      maxWidth: "560px",     // prevents huge image
      width: "100%",
    }}
    margin={{ bottom: "medium" }}
    pad="0"
  >
    <Box style={{ position: "relative", borderRadius: "14px", overflow: "hidden" }}>
      <Image
        src={current.image}
        alt={`${current.name} wearing her Hijab Match color recommendation`}
        fit="cover"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
    </Box>
  </Box>

        <Box gap="medium">
    

    <Text size="large" style={{ fontStyle: "italic" }}>
      “{current.quote}”
    </Text>

    <Box gap="xsmall">
      <Text weight="bold" size="xxlarge">
        {current.name}
      </Text>
      <Text size="small" color="dark-3">
        {current.role}
      </Text>
    </Box>
  </Box>
</Box>

          {/* Navigation */}
          <Box direction="row" gap="small" align="center" margin={{ top: "small" }}>
            <Button icon={<Previous />} onClick={prev} aria-label="Previous testimonial"/>
            <Text size="small">
              {currentIndex + 1} / {testimonials.length}
            </Text>
            <Button icon={<Next />}onClick={next} aria-label="Next testimonial"/>
          </Box>
        </Box>
      
  );
};

export default Testimonials;