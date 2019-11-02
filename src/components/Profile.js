import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// Redux suff
import { useSelector } from "react-redux";

// MUI stuff
import makeStyles from "@material-ui/core/styles/makeStyles";

import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const useStyles = makeStyles(theme => ({
  ...theme.userProfile
}));

function Profile() {
  const classes = useStyles();
  const user = useSelector(state => state.user, []);

  const {
    authenticated,
    loading,
    credentials: { handle, imageUrl, bio, location, website, createdAt },
    likes,
    notifications
  } = user;

  const authCmpnt = () => (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/user/${handle}`}
            color="primary"
            variant="h5"
          >
            @{handle}
          </MuiLink>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          {location && (
            <>
              <LocationOn color="primary" /> <span>{location}</span>
              <hr />
            </>
          )}
          {website && (
            <>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {" "}
                {website}
              </a>
              <hr />
            </>
          )}
          <CalendarToday color="primary" />{" "}
          <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
        </div>
      </div>
    </Paper>
  );

  const unauthCmpnt = () => (
    <Paper className={classes.paper}>
      <Typography variant="body2" align="center">
        No profile found, please login again
      </Typography>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/signup"
        >
          Signup
        </Button>
      </div>
    </Paper>
  );

  let profileMarkup;
  if (!loading && authenticated) {
    profileMarkup = authCmpnt();
  } else if (!loading && !authenticated) {
    profileMarkup = unauthCmpnt();
  } else {
    profileMarkup = <div>Loading...</div>;
  }

  return profileMarkup;
}

export default Profile;
