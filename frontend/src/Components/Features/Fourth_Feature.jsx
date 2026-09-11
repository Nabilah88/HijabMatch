import React from 'react'
import { Text, Box, Page, PageContent, PageHeader, Image } from "grommet";

import styling from "../../assets/styling.jpg";
import hijabTry from "../../assets/hijab_tryon.png"

const Fourth_Feature = () => {
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
                     src={styling}
                     alt="styling"
                     style={{
                       width: "250px",
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
                              <Image src={hijabTry} width="64px" height="64px" />
                              <Text weight="bold" size="large">AI Hijab Try-On Preview</Text>
                              </Box>
                                 }
                     subtitle={
                       <Box gap="xsmall">
                         <Box direction="row" gap="small">
                           <Text>•</Text>
                           <Text>
                             See yourself wearing recommended hijab colors.
                           </Text>
                         </Box>
     
                         <Box direction="row" gap="small">
                           <Text>•</Text>
                           <Text>
                             Swipe through shades.
                           </Text>
                         </Box>
     
                         <Box direction="row" gap="small">
                           <Text>•</Text>
                           <Text>
                             Helps users visualize before buying or styling.
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

export default Fourth_Feature