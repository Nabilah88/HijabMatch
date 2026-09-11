import React from "react";
import { Box, Text, Image } from "grommet";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_hijabmatch_bg.png";

const items = [
  { label: "How It Works", to: "/#how-it-works" },
  { label: "Color Analysis", to: "/analyze" },
  { label: "About", to: "/aboutus" },
];

const NavBar = () => {
  return (
    <Box
      direction="row"
      background="transparent"
      justify="between"
      pad={{ vertical: "12px", horizontal: "24px" }}
      align="center"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      {/* LEFT — LOGO */}
      <Box direction="row" align="center" gap="small">
        <Image src={logo} style={{ width: "50px" }} />
        <Text color="#F5F5F5" weight="bold" size="20px" style={{ whiteSpace: "nowrap" }}>
          Hijab Match
        </Text>
      </Box>

      {/* CENTER — NAVIGATION */}
      <Box direction="row" gap="32px" align="center">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Text color="#F5F5F5" size="16px" style={{ whiteSpace: "nowrap" }}>
            Home
          </Text>
        </Link>

        {items.map((item) => (
          <Link key={item.label} to={item.to} style={{ textDecoration: "none" }}>
            <Text color="#F5F5F5" size="16px" style={{ whiteSpace: "nowrap" }}>
              {item.label}
            </Text>
          </Link>
        ))}
      </Box>

      {/* RIGHT — EMPTY FOR CENTERING */}
      <Box width="200px" />
    </Box>
  );
};

export default NavBar;
