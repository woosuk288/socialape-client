import React, { useState } from "react";
import MyButton from "../../util/MyButton";

// MUI sutff
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

// Redux
import { useDispatch } from "react-redux";
import { deleteScream } from "../../redux/actions/dataActions";

const useStyles = makeStyles(theme => ({
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "10%"
  }
}));

function DeleteButton(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function deleteScreamAct() {
    dispatch(deleteScream(props.screamId));
    setOpen(false);
  }

  return (
    <>
      <MyButton
        tip="Delete Sctream"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this scream ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteScreamAct} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteButton;
