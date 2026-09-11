import React from "react";
import {Box, Text} from "grommet";
import Example from '../../assets/example.png'



const ExamplesSection = () => {
  const examples = [
    {
      name: "Halima",
      season: "Light Spring",
      image: Example,
      colors: ["#FFCBA4", "#FF9999", "#AFEEEE"]
    },
    // Add 2-3 more examples
  ];

  return (
    <Box pad="large" background="radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)">
      <Text size="xlarge" weight="bold" textAlign="center" margin={{ bottom: "large" }}>
        Real Results from Hijab Finds
      </Text>
      
      <Box direction="row" gap="medium" justify="center" wrap>
        {examples.map((ex, idx) => (
          <Box 
            key={idx} 
            width="medium" 
            background="white" 
            round="small" 
            pad="medium"
            elevation="small"
          >
            <img 
              src={ex.image} 
              alt={ex.name}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <Text weight="bold" margin={{ top: "small" }}>{ex.season}</Text>
            <Box direction="row" gap="xsmall" margin={{ top: "small" }}>
              {ex.colors.map((color, i) => (
                <Box 
                  key={i}
                  width="40px" 
                  height="40px" 
                  background={color}
                  round="xsmall"
                />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ExamplesSection;