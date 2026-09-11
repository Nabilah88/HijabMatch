import React from "react";
import { Box, Button, Text, Heading, Image, Anchor } from "grommet";
import ContactIllustration from "../../assets/contact.jpg";

const Hero_Contact = () => {
  return (
    <>
   

      
      <Box
        direction="row"
        align="center"
        justify="between"
        
        pad={{ vertical: "xlarge", horizontal: "large" }}
        background="linear-gradient(135deg, rgba(255,182,193,0.35), rgba(128,0,128,0.55))"
        style={{ minHeight: "420px", position: "relative", overflow: "hidden", paddingTop: "120px" }}
        
      >
        <Box style={{ position: "absolute", top: 150, left: 49, zIndex: 3 }}>
          <Box direction="row" align="center" gap="xsmall">
            <Anchor label="HijabMatch" size="small" color="#bfbcd6" />
            <Text size="small" color="dark-4">›</Text>
            <Text size="small" color="dark-4">Contact Us</Text>
          </Box>
        </Box>
        
        <Box width="50%" pad={{ right: "medium" }}>
          <Heading level={1} margin="none">
            Contact Us
          </Heading>

          <Text
            size="medium"
            color="dark-4"
            style={{ maxWidth: "380px", lineHeight: 1.7, marginTop: "8px" }}
          >
            We'd love to hear from you.
          </Text>

          <Button
            label="Get in Touch"
            primary
            style={{
              padding: "8px 18px",
              fontSize: "15px",
              borderRadius: "24px",
              background: "linear-gradient(90deg, rgba(184,74,203,0.08), rgba(229,138,181,0.08))",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "white",
              fontWeight: 600,
              width: "fit-content",
              boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
              marginTop: "10px",
            }}
            onClick={() => {
              const el = document.getElementById("contactus");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </Box>

       
        <Box width="50%" align="center" justify="center">
          <Image
            src={ContactIllustration}
            fit="cover"
            style={{
              width: "100%",
              maxWidth: "360px",
              borderRadius: "18px",
              boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
            }}
          />
        </Box>

      </Box>
    </>
  );
};

export default Hero_Contact;
