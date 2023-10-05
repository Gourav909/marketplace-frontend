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

  const handleDashbordPage = () => {
    if (userType === "Admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  };
  return (
    <AppBar position="static" sx={{ mb: 5 }}>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <Button color="inherit" onClick={() => handleDashbordPage()}>
          Dashboard
        </Button>
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
