import React from 'react'
import { Text, Box, Page, PageContent, PageHeader, Image } from "grommet";

import stylish from "../../assets/stylish_hijab.jpg";

import smartHijab from "../../assets/smart_hijab.png"
const Fifth_Feature = () => {
  return (
     <Box
    justify="center"
    align="center"
    pad="xlarge"
    background="linear-gradient(180deg, #9e466fff 0%, #a06ab8ff 100%)"
    round="xsmall"
  >
    <Page>
      <PageContent>
        <Box
          direction="row"
          gap="small"
          align="center"
          justify="between"
          pad="medium"
        >

          <Box width="large">
            <PageHeader
              title={ 
                      <Box direction="row" align="center" gap="small">
                      <Image src={smartHijab} width="64px" height="64px" />
                      <Text weight="bold" size="large">Smart Styling Tips</Text>
                      </Box>
                    }
              subtitle={
                <Box gap="xsmall">
                    <Box direction="row" gap="xsmall">
                     <Text>.</Text>
                     <Text>Suggestions for outfits that match the recommended hijab color.</Text>
                     </Box>
                     <Box direction="row" gap="xsmall">
                     <Text>.</Text>
                     <Text>Advice on fabrics (chiffon, satin, jersey).</Text>
                     </Box>
                     <Box direction="row" gap="xsmall">
                        <Text>.</Text>
                  <Text>Seasonal styling ideas.</Text>
                  </Box>   
                  </Box>
                
              }
              level={1}
            />
          </Box>

          {/* RIGHT SIDE: IMAGE */}
          <Box>
            <img
              src={stylish}
              alt="stylish girl"
              style={{
                width: "350px",
                height: "auto",
                borderRadius: "12px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
              }}
            />
          </Box>
        </Box>
      </PageContent>
    </Page>
  </Box>
  )
}

export default Fifth_Feature