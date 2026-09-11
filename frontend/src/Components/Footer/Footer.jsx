import React from 'react';
import { Anchor, Box, Footer, Text } from 'grommet';
import { threeColumns as data } from '../Footer/Data';
import { Link } from "react-router-dom";
import logo from '../../assets/logo_hijabmatch_bg.png';

export const MyLogoIcon = ({ size = 32, ...props }) => (
  <img
    src={logo}
    alt="Hijab Match Logo"
    width={size}
    height={size}
    style={{ display: "block" }}
    {...props}
  />
);

const FooterAnchor = ({ href, children }) => (
  <Link
    to={href}
    style={{
      color: "white",
      fontSize: "14px",
      textDecoration: "none"
    }}
  >
    {children}
  </Link>
);


export const Sitemap = () => (
  <Footer
    direction="column"
    background="linear-gradient(180deg, rgba(255, 182, 219, 0.3), rgba(209, 70, 123, 0.6))"
    pad={{ vertical: "large", horizontal: "xlarge" }}
  >

    <Box
      direction="row"
      align="start"
      justify="between"
      gap="xxlarge"
      wrap
    >
    
      <Box
       width="small"               
       margin={{ right: "large" }} 
       align="center"
       gap="small"
      >
      <MyLogoIcon size={48} />
      <Text weight="bold" size="xlarge" color="white">
        Hijab Match
      </Text>
</Box>


     
      <Box direction="row" gap="xxlarge" wrap>
         {data.map((item) => (
           <Box key={item.title} gap="small" width="small">
           <Text weight="bold" size="medium" color="white">
           {item.title}
          </Text>
            <Box gap="small">
             {item.links.map((link) => (
             <FooterAnchor key={link.label} href={link.href}>
             {link.label}
  </FooterAnchor>
))}

            </Box>
          </Box>
        ))}
      </Box>
    </Box>

    <Box
      width="100%"
      border={{ side: "top", color: "white", size: "xsmall" }}
      margin={{ top: "large" }}
      pad={{ top: "medium" }}
      align="center"
    />

    
    <Box align="center">
      <Text size="small" color="white" opacity="0.8">
        © {new Date().getFullYear()} Hijab Match — All Rights Reserved
      </Text>
    </Box>

  </Footer>
);

export default Sitemap;