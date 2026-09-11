import React from 'react'
import { Box, Text, Button } from "grommet";



const ColorComparisonDemo = () => {
  const demoData = [
    {
      season: "Deep Autumn",
      beforeColor: "#FFB6C1", 
      afterColor: "#B7410E",  
      description: "Deep Autumn tones shine in warm, rich colors"
    },
    {
      season: "Light Summer", 
      beforeColor: "#FF8C00", 
      afterColor: "#B0E0E6",  
      description: "Light Summer looks best in soft, cool pastels"
    }
  ];

  return (
    <Box pad="large" gap="large">
      <Text size="xlarge" weight="bold" textAlign="center">
        See The Difference
      </Text>
      
      {demoData.map((demo, idx) => (
        <Box key={idx} direction="row" gap="medium" align="center">
          {/* Before */}
          <Box align="center" gap="small">
            <Text size="small" color="status-error">❌ Wrong Color</Text>
            <Box 
              width="150px" 
              height="150px" 
              background={demo.beforeColor}
              round="small"
            />
          </Box>

          <Text size="xxlarge">→</Text>

          {/* After */}
          <Box align="center" gap="small">
            <Text size="small" color="status-ok">✓ Perfect Match</Text>
            <Box 
              width="150px" 
              height="150px" 
              background={demo.afterColor}
              round="small"
            />
          </Box>

          {/* Description */}
          <Box flex pad="medium" background="light-2" round="small">
            <Text weight="bold">{demo.season}</Text>
            <Text size="small">{demo.description}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ColorComparisonDemo;