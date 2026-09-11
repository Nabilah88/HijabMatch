import React from 'react'

import { Text, Box} from "grommet";

const Title_Feature = () => {
  return (
<Box align="center" margin={{ vertical: "large" }}>
  <Text
    size="xxlarge"
    weight="bold"
    color="#4A2C2A"
    style={{ letterSpacing: "0.5px" }}
  >
    Features of Hijab Finds
  </Text>

  <Box
    height="3px"
    width="80px"
    background="#df5d9a"
    round="small"
    margin={{ top: "small" }}
  />
</Box>

  )
}

export default Title_Feature