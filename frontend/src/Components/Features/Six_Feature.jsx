import React from 'react'

import { Text, Box, Page, PageContent, PageHeader, Image } from "grommet";

import saveStyle from "../../assets/save_style.png"

import save from "../../assets/taking_pics.jpg";

const Six_Feature = () => {
  return (
    <Box
          justify="center"
          align="center"
          pad="xlarge"
          background="linear-gradient(180deg, rgba(255,182,193,0.3), rgba(128,0,128,0.6))"
          round="xsmall"
        >
          <Page>
            <PageContent>
              <Box
                direction="row"
                gap="large"
                align="center"
                justify="between"
                pad="medium"
              >
                {/* LEFT SIDE: IMAGE */}
                <Box>
                  <img
                    src={save}
                    alt="save result"
                    style={{
                      width: "350px",
                      height: "auto",
                      borderRadius: "12px",
                      boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                    }}
                  />
                </Box>
    
                {/* RIGHT SIDE: TEXT */}
                <Box width="large">
                  <PageHeader
                    title={ 
                            <Box direction="row" align="center" gap="small">
                            <Image src={saveStyle} width="64px" height="64px" />
                            <Text weight="bold" size="large">Save and Share Your Color Profile</Text>
                            </Box>
                          }
                    subtitle={
                      <Box gap="xsmall">
                        <Box direction="row" gap="small">
                          <Text>•</Text>
                          <Text>
                            Save your results for future reference.
                          </Text>
                        </Box>
    
                        <Box direction="row" gap="small">
                          <Text>•</Text>
                          <Text>
                            Share your palette with friends.
                          </Text>
                        </Box>
    
                        <Box direction="row" gap="small">
                          <Text>•</Text>
                          <Text>
                            Useful for shopping or planning outfits.
                          </Text>
                        </Box>
                      </Box>
                    }
                    level={1}
                  />
                </Box>
              </Box>
            </PageContent>
          </Page>
        </Box>
  )
}

export default Six_Feature