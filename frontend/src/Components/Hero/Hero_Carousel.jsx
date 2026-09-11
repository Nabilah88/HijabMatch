import React from 'react'
import SlideOne from "./HeroSection"
import SlideTwo from "./HeroSection2"
import SlideThree from "./HeroSection3"
import { Grommet, Carousel, Box } from "grommet";


const theme = {
  global: {
   
    colors: { brand: "#9a18c2" },
  },
};

const Hero_Carousel = () => {
  return (
       <Grommet theme={theme} full>
      <Carousel play={5000} controls="arrows">
        <SlideOne />
        <SlideTwo/>
        <SlideThree/>
    
      </Carousel>
    </Grommet>
  )
}

export default Hero_Carousel;