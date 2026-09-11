import React from "react";
import { Close, FormDown, FormUp } from "grommet-icons";
import { Avatar, Box, Button, Drop, Text, Heading, Anchor,Nav } from "grommet";
import { Link } from "react-router-dom";


const NavDropdown = ({ label, items }) => {
  const [open, setOpen] = React.useState(false);
  const targetRef = React.useRef();

  const DropHeader = ({ onClose }) => (
    <Box
      direction="row"
      justify="between"
      align="center"
      pad={{ vertical: "xsmall" }}
      border={{ side: "bottom", color: "light-4" }}
      margin={{ bottom: "small" }}
    >
      <Heading color="#F5F5F5" level={4} margin="none">
        Menu
      </Heading>
      <Button icon={<Close />} onClick={onClose} />
    </Box>
  );

  return (
<Box style={{ display: "flex", justifyContent: "center", width: "100%", }}>
      <Nav direction="row" gap="32px" justify="center" align="center">
        <Anchor ref={targetRef} plain onClick={() => setOpen(!open)}>
          <Box direction="row" align="center" gap="6px">
            <Text color="#F5F5F5" size="20px">
              {label}
            </Text>
            {open ? <FormUp color="purple" /> : <FormDown color="purple" />}
          </Box>
        </Anchor>
      </Nav>

      {open && (
        <Drop
          target={targetRef.current}
          align={{ top: "bottom" }}
          onClickOutside={() => setOpen(false)}
          onEsc={() => setOpen(false)}
          plain
        >
          <Box
            background="#a36db3ff"
            pad="small"
            round="small"
            elevation="small"
            gap="small"
            animation={{ type: "fadeIn", duration: 150 }}
            width="200px"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
          >
            <DropHeader onClose={() => setOpen(false)} />

            {items.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                style={{ textDecoration: "none" }}
                onClick={() => setOpen(false)}
              >
                <Box pad="xsmall" hoverIndicator="light-3" round="xsmall">
                  <Text color="#F5F5F5">{item.label}</Text>
                </Box>
              </Link>
            ))}
          </Box>
        </Drop>
      )}
    </Box>
  );
};

export default NavDropdown;
