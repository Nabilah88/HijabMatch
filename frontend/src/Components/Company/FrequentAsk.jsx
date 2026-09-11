import React from 'react'
import { Page, PageContent, Heading, Paragraph, Grid, Card, Text } from 'grommet';
import { Accordion, AccordionPanel, Box } from 'grommet';

const FrequentAsk = () => {
  return (
      <Box
          fill
          align="center"
          justify="center"
          pad="large"
          background="linear-gradient(135deg, #f7d4e8 0%, #d8b4fe 100%)"
          style={{ minHeight: "calc(100vh - 80px)" }}
          id="faq"
        >
    <Page kind="narrow">
    <PageContent background="light-3">
      <Heading textAlign='left'>FAQ</Heading>
      <Box>
    <Accordion multiple>
      <AccordionPanel id='skin-tone' label="1. How does the skin tone analysis work?">
  <Box
    background="white"
    pad={{ vertical: "small", horizontal: "medium" }}
    margin={{ top: "xsmall" }}
    round="small"
    border={{ color: "#e8e4f2", size: "xsmall" }}
    style={{ lineHeight: 1.6 }}
  >
    <Text size="small" color="dark-4">
      Our AI analyzes the natural pigments in your skin — especially around the cheeks —
      to identify your undertone and match it to a color season. It looks at warmth, depth,
      and contrast to recommend hijab shades that enhance your natural beauty.
    </Text>
  </Box>
</AccordionPanel>
      <AccordionPanel label="2. Is my photo stored or shared?">
        <Box id="photo-privacy" background="white"
    pad={{ vertical: "small", horizontal: "medium" }}
    margin={{ top: "xsmall" }}
    round="small"
    border={{ color: "#e8e4f2", size: "xsmall" }}
    style={{ lineHeight: 1.6 }}>
          Yes — your photo is temporarily stored in our system so we can analyze your undertone and generate your results. 
          It is never shared, never sold, and never used for anything outside your analysis. 
          Since HijabMatch works in guest mode, you cannot view past results later unless you 
          choose to email them to yourself.
        </Box>
      </AccordionPanel>
      <AccordionPanel  label="3. What is a color season?">
        <Box  id="color-season"
        background="white"
    pad={{ vertical: "small", horizontal: "medium" }}
    margin={{ top: "xsmall" }}
    round="small"
    border={{ color: "#e8e4f2", size: "xsmall" }}
    style={{ lineHeight: 1.6 }}>
          A color season is a way of grouping your natural coloring — including undertone, depth, and contrast — 
          into a palette that enhances your features. Instead of only the four classic seasons (Spring, Summer, Autumn, Winter),
           HijabMatch uses a more detailed system with categories like Deep Autumn, Light Spring, True Autumn, Soft Summer, Clear Winter, and more. 
           This gives you a more accurate and personalized color match for your hijab shades.
        </Box>
      </AccordionPanel>
        <AccordionPanel label="4. How accurate is the analysis?">
        <Box  background="white"
    pad={{ vertical: "small", horizontal: "medium" }}
    margin={{ top: "xsmall" }}
    round="small"
    border={{ color: "#e8e4f2", size: "xsmall" }}
    style={{ lineHeight: 1.6 }}>
         Our AI is trained on a wide range of skin tones and undertones, and it continues to improve. 
         While no system is perfect, you can expect highly consistent and
          reliable results — especially when the photo is taken in good lighting.
        </Box>
      </AccordionPanel>
         <AccordionPanel label="5. What kind of lighting should I use for the best results?">
        <Box  background="white"
    pad={{ vertical: "small", horizontal: "medium" }}
    margin={{ top: "xsmall" }}
    round="small"
    border={{ color: "#e8e4f2", size: "xsmall" }}
    style={{ lineHeight: 1.6 }}>
        Natural daylight works best. Stand facing a window, avoid harsh shadows, and remove 
        any strong colored lighting. This helps the AI read your undertone more accurately.
        </Box>
      </AccordionPanel>
        <AccordionPanel label="6. Can I retake the photo?">
        <Box  background="white"
    pad={{ vertical: "small", horizontal: "medium" }}
    margin={{ top: "xsmall" }}
    round="small"
    border={{ color: "#e8e4f2", size: "xsmall" }}
    style={{ lineHeight: 1.6 }}>
        Yes, anytime. You can retake your photo as many times as you like until you’re happy with the result.
        </Box>
      </AccordionPanel>
       <AccordionPanel id="makeup" label="7. Do I need to wear makeup for the analysis?">
        <Box  background="white"
    pad={{ vertical: "small", horizontal: "medium" }}
    margin={{ top: "xsmall" }}
    round="small"
    border={{ color: "#e8e4f2", size: "xsmall" }}
    style={{ lineHeight: 1.6 }}>
         No. For the most accurate reading, we recommend taking the photo with minimal 
         or no makeup so your natural undertone is visible.
        </Box>
      </AccordionPanel>
       <AccordionPanel label="8. What hijab colors will I get?">
        <Box  background="white"
    pad={{ vertical: "small", horizontal: "medium" }}
    margin={{ top: "xsmall" }}
    round="small"
    border={{ color: "#e8e4f2", size: "xsmall" }}
    style={{ lineHeight: 1.6 }}>
         You’ll receive a curated palette based on your season and undertone. These colors are chosen to brighten
          your complexion, enhance your features, and help you feel confident in your hijab choices
        </Box>
      </AccordionPanel>
      <AccordionPanel label="9. Will the recommended colors work with different hijab fabrics?">
        <Box  background="white"
    pad={{ vertical: "small", horizontal: "medium" }}
    margin={{ top: "xsmall" }}
    round="small"
    border={{ color: "#e8e4f2", size: "xsmall" }}
    style={{ lineHeight: 1.6 }}>
        Yes. The palette is based on color harmony, not fabric type.
        Whether you wear chiffon, cotton, satin, or jersey, the recommended shades will still 
        complement your skin tone.
        </Box>
      </AccordionPanel>
        <AccordionPanel label="10. Can I upload a photo with my hijab on?">
        <Box  background="white"
    pad={{ vertical: "small", horizontal: "medium" }}
    margin={{ top: "xsmall" }}
    round="small"
    border={{ color: "#e8e4f2", size: "xsmall" }}
    style={{ lineHeight: 1.6 }}>
        For the most accurate results, we recommend taking the photo without a hijab, 
        so the AI can clearly analyze your skin. If you prefer to keep your hijab on, 
        choose a neutral or light-colored hijab that doesn’t cast shadows on your face.
        </Box>
      </AccordionPanel>
        <AccordionPanel label="10. Can I upload a photo with my hijab on?">
        <Box  background="white"
    pad={{ vertical: "small", horizontal: "medium" }}
    margin={{ top: "xsmall" }}
    round="small"
    border={{ color: "#e8e4f2", size: "xsmall" }}
    style={{ lineHeight: 1.6 }}>
        For the most accurate results, we recommend taking the photo without a hijab, 
        so the AI can clearly analyze your skin. If you prefer to keep your hijab on, 
        choose a neutral or light-colored hijab that doesn’t cast shadows on your face.
        </Box>
      </AccordionPanel>
        <AccordionPanel label="11. Do you recommend colors for outfits too?">
        <Box  background="white"
    pad={{ vertical: "small", horizontal: "medium" }}
    margin={{ top: "xsmall" }}
    round="small"
    border={{ color: "#e8e4f2", size: "xsmall" }}
    style={{ lineHeight: 1.6 }}>
        Right now, Hijab Finds focuses on hijab color recommendations.
         Outfit color matching is coming soon as part of our expanded style tools.
        </Box>
      </AccordionPanel>
      <AccordionPanel label="12. Why is the camera not working on my device?">
        <Box  background="white"
    pad={{ vertical: "small", horizontal: "medium" }}
    margin={{ top: "xsmall" }}
    round="small"
    border={{ color: "#e8e4f2", size: "xsmall" }}
    style={{ lineHeight: 1.6 }}>
       This usually happens when the browser doesn’t have permission to access your camera. 
       Check your browser settings and allow camera access for Hijab Finds. 
       Refreshing the page often helps too.
        </Box>
      </AccordionPanel>
         <AccordionPanel label="13. Does Hijab Finds work on all phones?">
        <Box  background="white"
    pad={{ vertical: "small", horizontal: "medium" }}
    margin={{ top: "xsmall" }}
    round="small"
    border={{ color: "#e8e4f2", size: "xsmall" }}
    style={{ lineHeight: 1.6 }}>
       Hijab Finds works on most modern smartphones and browsers. For the smoothest experience, 
       we recommend using the latest version of Chrome or Safari.
        </Box>
      </AccordionPanel>
       <AccordionPanel label="14. How do I contact support?">
        <Box background="white"
    pad={{ vertical: "small", horizontal: "medium" }}
    margin={{ top: "xsmall" }}
    round="small"
    border={{ color: "#e8e4f2", size: "xsmall" }}
    style={{ lineHeight: 1.6 }}>
       Scroll down to the Contact Us section or click the button at the top of the page. 
       We’re always happy to help.
        </Box>
      </AccordionPanel>
       <AccordionPanel label="15. Who created Hijab Finds?">
        <Box  background="white"
    pad={{ vertical: "small", horizontal: "medium" }}
    margin={{ top: "xsmall" }}
    round="small"
    border={{ color: "#e8e4f2", size: "xsmall" }}
    style={{ lineHeight: 1.6 }}>
       Hijab Finds was created with love to help women discover the hijab colors that make them feel 
       confident, radiant, and seen. It combines beauty, technology, and modest fashion in one simple experience.
        </Box>
      </AccordionPanel>
      <AccordionPanel label="16. Is Hijab Finds free to use?">
        <Box  background="white"
    pad={{ vertical: "small", horizontal: "medium" }}
    margin={{ top: "xsmall" }}
    round="small"
    border={{ color: "#e8e4f2", size: "xsmall" }}
    style={{ lineHeight: 1.6 }}>
       Yes, the core features — including skin tone analysis and color recommendations — are free. 
       Additional premium features may be added in the future.
        </Box>
      </AccordionPanel>
      <AccordionPanel label="17. Will you add more features?">
        <Box  background="white"
    pad={{ vertical: "small", horizontal: "medium" }}
    margin={{ top: "xsmall" }}
    round="small"
    border={{ color: "#e8e4f2", size: "xsmall" }}
    style={{ lineHeight: 1.6 }}>
       Yes. We’re actively working on new tools like outfit color matching, AI hijab try‑on, 
       and personalized style guides.
        </Box>
      </AccordionPanel>
    </Accordion>
  </Box>
        </PageContent>
        </Page>
        </Box>
  )
}

export default FrequentAsk