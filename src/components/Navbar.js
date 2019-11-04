import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MyButton from "../util/MyButton";

// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// Icons
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

function Navbar() {
  const { authenticated } = useSelector(state => state.user);

  return (
    <AppBar>
      <Toolbar className="nav-container">
        {authenticated ? (
          <>
            <MyButton tip="Post a Scream">
              <AddIcon color="primary" />
            </MyButton>
            <Link to="/">
              <MyButton tip="home">
                <HomeIcon color="primary" />
              </MyButton>
            </Link>
            <MyButton tip="Notifications">
              <Notifications color="primary" />
            </MyButton>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
