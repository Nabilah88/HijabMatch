import React from 'react'
import dream from "../../assets/dream_hijab.jpg";
import { Anchor, Button, Box, Image, Text, Heading } from 'grommet';
import { Link } from "react-router-dom";
const Hero_Company = () => {
  return (
    <Box
      pad={{ vertical: "xlarge", horizontal: "large" }}
      align="center"
      justify="center"
      background="linear-gradient(180deg, rgba(255,182,193,0.3), rgba(128,0,128,0.6))"
      width="100%"
      style={{ minHeight: "420px", position: "relative", overflow: "hidden" }}
    >
      <Box
        direction="row"
        gap="xlarge"
        align="center"
        justify="center"
        width="100%"
        wrap={false}
      >
        {/* Image col */}
        <Box
          flex={false}
          style={{
            width: "260px",
            height: "320px",
            borderRadius: "120px 120px 80px 80px",
            overflow: "hidden",
            border: "4px solid rgba(127,119,221,0.25)",
            flexShrink: 0,
          }}
        >
          <Image
            src={dream}
            alt="Woman wearing hijab"
            fit="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>

        {/* Text col */}
        <Box width="large" gap="small">
          {/* Breadcrumb */}
          <Box direction="row" align="center" gap="xsmall">
            <Anchor label="HijabMatch" size="small" color="#bfbcd6" />
            <Text size="small" color="dark-4">›</Text>
            <Text size="small" color="dark-4">About Us</Text>
          </Box>

          {/* Headline */}
          <Heading level={1} margin="none" style={{ lineHeight: 1.15 }}>
            From struggle to{" "}
            <span style={{ color: "#534AB7" }}>solution</span>
          </Heading>

          {/* Subtitle */}
          <Text
            size="medium"
            color="dark-4"
            style={{ maxWidth: "380px", lineHeight: 1.7 }}
          >
            One woman's frustration finding the right colors became a tool for
            every woman who's ever wondered what works for her skin tone.
          </Text>

          {/* CTAs */}
          <Box direction="row" gap="small" margin={{ top: "small" }}>
            <Button
              label="Get started"
              primary
              style={{
                borderRadius: "50px",
                background: "#9e4ab7",
                border: "none",
                padding: "12px 28px",
              }}
             as={Link} to="/analyze"

            />
            <Button
              label="Our story"
              primary
               onClick={() => {
               const el = document.getElementById("aboutus");
               if (el) el.scrollIntoView({ behavior: "smooth" });
  }}

              style={{
                borderRadius: "50px",
                border: "1.5px solid rgba(183, 74, 174, 0.35)",
                color: "#9e4ab7",
                padding: "11px 24px",
                background: "transparent",
              }}
            />
          </Box>

          {/* Tags */}
          <Box direction="row" gap="small" margin={{ top: "small" }} wrap>
            {[
              { label: "Seasonal color theory", bg: "#EEEDFE", color: "#3C3489" },
              { label: "Modest fashion", bg: "#FBEAF0", color: "#72243E" },
              { label: "AI-powered", bg: "#E1F5EE", color: "#085041" },
            ].map(({ label, bg, color }) => (
              <Box
                key={label}
                pad={{ vertical: "xsmall", horizontal: "small" }}
                round="xlarge"
                background={bg}
              >
                <Text size="small" weight="bold" style={{ color }}>
                  {label}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero_Company;