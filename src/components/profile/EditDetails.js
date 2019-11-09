import React, { useState, useEffect } from "react";
import MyButton from "../../util/MyButton";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

// MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(theme => ({
  ...theme.sign,
  button: {
    float: "right"
  }
}));

function EditDetails() {
  const [userDetails, setUserDetails] = useState({
    bio: "",
    website: "",
    location: "",
    open: false
  });

  const classes = useStyles();

  const user = useSelector(state => state.user, []);
  const dispatch = useDispatch();

  useEffect(() => {
    mapUserDetailsToState(user.credentials);
  }, []);

  function mapUserDetailsToState(credentials, open = false) {
    setUserDetails({
      open,
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : ""
    });
  }

  function handleChange(e) {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit() {
    const editDetails = (({ open, ...rest }) => ({ ...rest }))(userDetails);
    dispatch(editUserDetails(editDetails));
    handleClose();
  }

  function handleOpen() {
    mapUserDetailsToState(user.credentials, true);
  }

  function handleClose() {
    setUserDetails({
      ...userDetails,
      open: false
    });
  }

  const { bio, website, location, open } = userDetails;

  return (
    <>
      <MyButton
        tip="Edit details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              tpye="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="website"
              tpye="text"
              label="Website"
              placeholder="Your personal/professinal website"
              className={classes.textField}
              value={website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              tpye="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditDetails;
