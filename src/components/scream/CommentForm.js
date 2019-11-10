import React, { useState } from "react";

// MUI Stuff
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const useStyles = makeStyles(theme => ({
  ...theme.sign,
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%"
  },
  commentData: {
    marginLeft: 20
  }
}));

function CommentForm(props) {
  const classes = useStyles();

  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  const UI = useSelector(state => state.UI, []);
  const user = useSelector(state => state.user, []);
  const { errors } = UI;

  function handleChange(e) {
    setBody(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const isSent = await dispatch(submitComment(props.screamId, { body }));
    isSent && setBody("");
  }

  const commentFormMarkup = user.authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;
  return commentFormMarkup;
}

export default CommentForm;
