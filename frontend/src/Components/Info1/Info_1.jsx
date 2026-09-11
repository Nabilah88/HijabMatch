import React, { useState } from "react";
import { Box, Image, Text, Grid, Heading } from "grommet";
import swatches from "../../assets/color_swatches.png";
import example from "../../assets/example.png";
import autumn from "../../assets/true_autumn.png";

const testimonials = [
  { image: swatches, quote: "Hijab Match is redefining modest fashion with smart, accurate color guidance.", name: "Halima Saleem", season: "Light Spring" },
  { image: example, quote: "I finally understand which colors make me glow! This changed my wardrobe.", name: "Amira Khan", season: "Light Spring" },
  { image: autumn, quote:  "The AI analysis was spot-on. I get compliments every time I wear my recommended colors!", name: "Zainab Ali", season:"True Autumn" },
];

export const Info_1 = () => (
  <Box pad="xlarge" align="center" background="linear-gradient(180deg, rgba(255,182,193,0.3), rgba(128,0,128,0.6))">
    <Heading margin="none">Listen to what our users have to say..</Heading>
    
    <Text size="xxlarge" weight="bold" margin={{top:"large", bottom:"large" }}>
      Their Testimonials
    </Text>
    
    <Grid columns={{ count: 3, size: "auto" }} gap="medium">
      {testimonials.map((testimonial, index) => (
        <Box
          key={index}
          background="white"
          round="small"
          pad="medium"
          elevation="small"
          gap="small"
        >
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            style={{ borderRadius: "8px", height: "200px", objectFit: "cover" }}
          />
          <Text size="small" style={{ fontStyle: "italic" }}>
            "{testimonial.quote}"
          </Text>
          <Box>
            <Text size="small" weight="bold">{testimonial.name}</Text>
            <Text size="xsmall" color="dark-3">{testimonial.season}</Text>
          </Box>
        </Box>
      ))}
    </Grid>
  </Box>
);

export default Info_1;

