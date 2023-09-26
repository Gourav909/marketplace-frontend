import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ mb: 5 }}>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <Button color="inherit">LogOut</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
