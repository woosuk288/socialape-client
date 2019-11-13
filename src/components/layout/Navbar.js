import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MyButton from "../../util/MyButton";
import PostScream from "../scream/PostScream";
import Notifications from "./Notifications";

// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// Icons
import HomeIcon from "@material-ui/icons/Home";

function Navbar() {
  const { authenticated } = useSelector(state => state.user);

  return (
    <AppBar>
      <Toolbar className="nav-container">
        {authenticated ? (
          <>
            <PostScream />
            <Link to="/">
              <MyButton tip="home">
                <HomeIcon color="primary" />
              </MyButton>
            </Link>
            <Notifications />
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
