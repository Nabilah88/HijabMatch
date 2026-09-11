
import React from "react";
import { Box, Button, Text, Heading, Image, Anchor } from "grommet";
import Privacy_hijab from "../../assets/privacy_woman.jpeg";

const Hero_Privacy = () => {
  return (
    <>
      <Box
        direction="row"
        align="center"
        justify="between"
        
        pad={{ vertical: "xlarge", horizontal: "large" }}
        background="linear-gradient(135deg, rgba(255,182,193,0.35), rgba(128,0,128,0.55))"
        style={{ minHeight: "80px", position: "relative", overflow: "hidden", paddingTop: "80px" }}
        
      >
        
        <Box width="70%" pad={{ right: "medium" }}>
          <Heading level={1} margin="none">
            Privacy Policy
          </Heading>

          <Text
            size="medium"
            color="dark-4"
            style={{ maxWidth: "380px", lineHeight: 1.7, marginTop: "8px" }}
          >
            "Your data. Your control. Our responsibility."
          </Text>

          <Button
            label="Our Privacy Policy"
            primary
            style={{
              padding: "6px 14px",
              fontSize: "14px",
              borderRadius: "30px",
              background: "linear-gradient(90deg, #b84acb, #e58ab5)",
              color: "white",
              fontWeight: 500,
              width: "fit-content",
              boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
              marginTop: "10px",
            }}
                      onClick={() => {
               const el = document.getElementById("privacy-policy");
               if (el) el.scrollIntoView({ behavior: "smooth" });
  }}
          />
        </Box>

       
        <Box width="50%" align="center" justify="center">
          <Image
            src={Privacy_hijab}
            fit="cover"
            style={{
              width: "100%",
              maxWidth: "360px",
              borderRadius: "18px",
              boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
            }}
          />
        </Box>

        
        {[
          { size: 90, bottom: 20, left: 20 },
          { size: 40, bottom: 110, left: 110 },
          { size: 40, top: 40, right: 80 },
          { size: 20, bottom: 70, right: 70 },
        ].map((c, i) => (
          <Box
            key={i}
            width={`${c.size}px`}
            height={`${c.size}px`}
            round="full"
            style={{
              position: "absolute",
              ...c,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              background: "rgba(255, 255, 255, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              animation: "float 6s ease-in-out infinite",
            }}
          />
        ))}

        <style>
          {`
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0px); }
            }
          `}
        </style>
      </Box>
    </>
  );
};

export default Hero_Privacy;
