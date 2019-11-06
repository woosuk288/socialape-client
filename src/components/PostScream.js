import React, { useState, useEffect } from "react";
import MyButton from "../util/MyButton";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { postScream } from "../redux/actions/dataActions";

// MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { CLEAR_ERRORS } from "../redux/type";

const useStyles = makeStyles(theme => ({
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%"
  }
}));

function PostScream() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");

  const UI = useSelector(state => state.UI, []);
  const dispatch = useDispatch();

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
    setBody("");
    dispatch({ type: CLEAR_ERRORS });
  }
  function handleChange(e) {
    setBody(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await dispatch(postScream({ body }));
    res && handleClose();
  }

  return (
    <>
      <MyButton tip="Post a Scream" onClick={handleOpen}>
        <AddIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="SCREAM!!"
              multiline
              rows="3"
              placeholder="Scream at your fellow apes"
              error={UI.errors.body ? true : false}
              helperText={UI.errors.body}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={UI.loading}
            >
              Submit
              {UI.loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PostScream;
