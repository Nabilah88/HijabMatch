import { Box, Image, Stack, Heading, Text, Button } from "grommet";
import { useSwipeable } from "react-swipeable";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HijabSlides from "./HijabSlides"; 

export default function Hero() {
  const navigate = useNavigate();
  const slides = HijabSlides(navigate);   

  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    trackMouse: true,
  });

  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box height="100vh" width="100%" overflow="hidden" {...handlers}>
      <Stack fill>
        <Image fit="contain" 
        src={slides[index].src} 
        style={{ position: "relative", zIndex: 1 }}/>

        <Box
          fill
          background={{
          image:"linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.45))",
          }}
          justify="center"
          align="center"
          pad="large"
          style={{ position: "relative", zIndex: 2 }}  
        >
          <Heading level={1} margin="none" color="white" textAlign="left">
            {slides[index].title}
          </Heading>

          <Text size="large" color="white" margin={{ vertical: "small" }}>
            {slides[index].subtitle}
          </Text>

         <Button
          label={slides[index].button}
          primary
          size="large"
          onClick={slides[index].onClick}
          margin={{ top: "medium" }}
          style={{ pointerEvents: "auto" }}
         />

        </Box>

        <Box
          direction="row"
          gap="small"
          justify="center"
          align="center"
          style={{ position: "absolute", bottom: "20px", width: "100%" }}
        >
          {slides.map((_, i) => (
            <Box
              key={i}
              height="10px"
              width={i === index ? "24px" : "10px"}
              round="full"
              background={i === index ? "brand" : "light-3"}
              onClick={() => setIndex(i)}
              style={{ cursor: "pointer", transition: "0.3s" }}
            />
          ))}
        </Box>
      </Stack>
    </Box>
  );
}