import React, { useState, useEffect } from "react";
import { 
  Grommet, Box, Heading, Text, Button, Image, 
  ResponsiveContext, Carousel, Tag 
} from "grommet";
import { useNavigate } from "react-router-dom";
import slidesData from "./slidesData";

const theme = {
  global: {
    font: {
      size: "4px",
      height: "2px",
    },
  },
};

const Hero_HijabMatch = () => {
  const navigate = useNavigate();
  const slides = slidesData(navigate);

  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {(size) => (
          <Carousel play={10000} controls="arrows" fill>
            {slides.map((slide) => (
              <Box
                key={slide.id}
                direction={size === "small" ? "column" : "row"}
                pad="large"
                gap="medium"
                align="center"
                justify="between"
                background="linear-gradient(180deg, rgba(255,182,193,0.3), rgba(185, 78, 185, 0.6))"
                height={{ min: "100vh" }}
              >
                {/* Left Side */}
            <Box
  flex
  align={size === "small" ? "center" : "start"}
  gap="medium"
  background="rgba(0,0,0,0.35)"
  pad="medium"
  round="small"
  animation={{ type: "fadeIn", duration: 800 }}
  style={{ backdropFilter: "blur(6px)" }}
>
  <Heading level={1} margin="none" color="white">
    {slide.heading}
  </Heading>

  <Text size="large" color="light-1">
    {slide.text}
  </Text>

  <Button
    primary
    label={slide.ctaLabel}
    onClick={slide.onClick}
    size="large"
  />

  <Box direction="row" gap="small" margin={{ top: "small" }}>
    <Box
      pad={{ vertical: "xsmall", horizontal: "small" }}
      background="rgba(255,255,255,0.2)"
      round="medium"
      onClick={() => handleTagClick(slide.tag1)}
      hoverIndicator="rgba(255,255,255,0.3)"
      style={{ cursor: "pointer" }}
    >
      <Text color="white">{slide.tag1}</Text>
    </Box>

    <Box
      pad={{ vertical: "xsmall", horizontal: "small" }}
      background="rgba(255,255,255,0.2)"
      round="medium"
      onClick={() => handleTagClick(slide.tag2)}
      hoverIndicator="rgba(255,255,255,0.3)"
      style={{ cursor: "pointer" }}
    >
      <Text color="white">{slide.tag2}</Text>
    </Box>
  </Box>
</Box>
 


                {/* Right Side */}
                <Box flex align="center" justify="center">
                  <Image src={slide.src} alt={slide.heading} fit="contain" />
                </Box>
              </Box>
            ))}
          </Carousel>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
};

export default Hero_HijabMatch;
