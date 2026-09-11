import React from "react";
import {
  Box,
  Page,
  PageContent,
  Heading,
  Paragraph,
  Grid,
  Image,
} from "grommet";

import Women from "../../assets/women.svg";
import woman_happy from "../../assets/woman_happy.svg";

const theme = {
  global: {
    colors: {
      brand: "#681d68",
    },
  },
 }

export const About_Us = () => (
  <Box
    id="aboutus"
    fill
    align="center"
    background="linear-gradient(180deg, rgba(255,182,193,0.3), rgba(128,0,128,0.6))"
    pad={{ vertical: "xlarge", horizontal: "medium" }}
  >
    <Page>
      <PageContent
        pad="large"
        round="large"
        elevation="large"
        style={{
          maxWidth: "1000px",
          background: "linear-gradient(180deg, #ffe4ec 0%, #f3e8ff 100%)",
        }}
      >

        
        <Grid columns={["1/2", "1/2"]} gap="large" align="center">

          
          <Box>
            <Heading level={1} margin={{ bottom: "small" }} color="#3b2f4a">
              Designed to help every woman find her perfect hijab shade
            </Heading>

            <Paragraph size="medium" color="#4b3b5c">
              HijabMatch was created from a simple frustration — buying hijabs online
              that didn’t match natural skin tones.
              <br /><br />
              Using AI-driven skin tone analysis and seasonal color theory, we help
              women discover shades that truly enhance their beauty and confidence.
            </Paragraph>
          </Box>

          
          <Box align="center" style={{ position: "relative" }}>

          
            <Box
              style={{
                background: "radial-gradient(circle, #ffffff40, transparent)",
                padding: "10px",
                borderRadius: "20px",
              }}
            >
              <Image
                src={woman_happy}
                fit="contain"
                style={{ maxHeight: "300px" }}
              />
            </Box>

           
<Box
  width="medium"
  pad="medium"
  round="medium"
  elevation="xxlarge"
  background="linear-gradient(135deg, #be10b6, #972d59)"
  style={{
    position: "absolute",
    right: "5px",
    bottom: "-100px",
    zIndex: 10,        
  }}

>
  <Paragraph
    size="large"
    style={{
      fontStyle: "italic",
      color: "#e8e4eb",
      margin: 0,
    }}
  >
    “I just wanted a hijab color that didn’t wash me out.
    That small frustration became HijabMatch.”
  </Paragraph>
</Box>
<Box
  width="50px"
  height="50px"
  background="brand"
  round="full"
  elevation="medium"
  style={{
    position: "absolute",
    left: "-80px",     // move left
    top: "-150px",   // move DOWN so it overlaps bottom edge
    zIndex: 10,        // circle sits ABOVE the quote card
  }}
/>

<Box
  width="150px"
  height="150px"
  background="brand"
  round="full"
  elevation="xxlarge"
  style={{
    position: "absolute",
    left: "-40px",     // move left
    top: "-120px",   // move DOWN so it overlaps bottom edge
    zIndex: 10,        // circle sits ABOVE the quote card
  }}
/>
</Box>
        </Grid>

   

      </PageContent>
    </Page>
  </Box>
);

export default About_Us;