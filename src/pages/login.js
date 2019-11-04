import React, { useState, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppIcon from "../images/pacman.png";
import { Link } from "react-router-dom";

// MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux stuff
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const useStyles = makeStyles(theme => ({
  ...theme.sign
}));

function LoginForm(props) {
  const classes = useStyles();

  const { user, UI } = useSelector(
    state => ({ user: state.user, UI: state.UI }),
    []
  );

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    loading: false,
    errors: {}
  });

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email: formData.email,
      password: formData.password
    };

    dispatch(loginUser(userData, props.history));
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const { email, password } = formData;
  const { loading, errors } = UI;

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="pacman" className={classes.image} />
        <Typography variant="h3" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={email}
            helperText={errors.email}
            error={errors.email ? true : false}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={password}
            helperText={errors.password}
            error={errors.password ? true : false}
            onChange={handleChange}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Login
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>

          <br />
          <small>
            don't have an account ? sign up <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

function login(props) {
  return <LoginForm {...props} />;
}

export default login;
