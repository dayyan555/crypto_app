import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as ScrollLink } from "react-scroll";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#5c2e91", padding: "10px 0" }}>
      <Toolbar>
        {/* Brand */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            fontWeight: "bold",
            letterSpacing: "1px",
            fontSize: "2.9rem", // Increase font size for brand
          }}
        >
          CryptoTracker
        </Typography>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <ScrollLink
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            style={{ textDecoration: "none" }}
          >
            <Button color="inherit">Home</Button>
          </ScrollLink>
          <ScrollLink
            to="price"
            spy={true}
            smooth={true}
            duration={500}
            style={{ textDecoration: "none" }}
          >
            <Button color="inherit">Price</Button>
          </ScrollLink>
          <ScrollLink
            to="favorites"
            spy={true}
            smooth={true}
            duration={500}
            style={{ textDecoration: "none" }}
          >
            <Button color="inherit">Favorites</Button>
          </ScrollLink>
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleMenuClose}>
              <ScrollLink
                to="home"
                spy={true}
                smooth={true}
                duration={500}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Home
              </ScrollLink>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ScrollLink
                to="price"
                spy={true}
                smooth={true}
                duration={500}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Price
              </ScrollLink>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ScrollLink
                to="favorites"
                spy={true}
                smooth={true}
                duration={500}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Favorites
              </ScrollLink>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
