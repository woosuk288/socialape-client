import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppIcon from "../images/pacman.png";
import axios from "axios";
import { Link } from "react-router-dom";

// MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  ...theme.sign
}));

function SignupForm(props) {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
    loading: false,
    errors: {}
  });

  async function handleSubmit(e) {
    console.log("hi : ", formData);
    e.preventDefault();
    setFormData({
      ...formData,
      loading: true,
      errors: {}
    });
    const newUserData = {
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      handle: formData.handle 
    };
    try {
      const res = await axios.post("/signup", newUserData);
      localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
      setFormData({
        ...formData,
        loading: false
      });
      window.location.href = "/";
    } catch (err) {
      setFormData({
        ...formData,
        loading: false,
        errors: err.response.data
      });
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const {
    email,
    password,
    confirmPassword,
    handle,
    loading,
    errors
  } = formData;

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="pacman" className={classes.image} />
        <Typography variant="h3" className={classes.pageTitle}>
          signup
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
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            value={confirmPassword}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="handle"
            className={classes.textField}
            value={handle}
            helperText={errors.handle}
            error={errors.handle ? true : false}
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
            signup
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>

          <br />
          <small>
            Already have an account ? login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

function signup() {
  return <SignupForm />;
}

export default signup;
