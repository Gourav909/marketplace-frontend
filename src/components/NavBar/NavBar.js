import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { currentUserDetails } = useSelector(
    (state) => state.getCurrentUserReducer
  );

  const navigate = useNavigate();
  const userType = currentUserDetails?.type;

  const favLinkClickHandler = () => {
    navigate("/user/favorites");
  };

  const handleLogOut = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ mb: 5 }}>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        {userType !== "Admin" && (
          <Button color="inherit" onClick={() => favLinkClickHandler()}>
            My Favorites
          </Button>
        )}
        <Button color="inherit" onClick={handleLogOut}>
          LogOut
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
