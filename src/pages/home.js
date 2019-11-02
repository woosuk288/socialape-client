import React, { Component } from "react";
import axiso from "axios";
import Grid from "@material-ui/core/Grid";

import Scream from "../components/Scream";
import Profile from "../components/Profile";

class home extends Component {
  state = {
    screams: null
  };

  componentDidMount() {
    axiso
      .get("/screams")
      .then(res => {
        this.setState({ screams: res.data });
      })
      .catch(err => console.error(err));
  }

  render() {
    let recentScreamsMarkup = this.state.screams ? (
      this.state.screams.map(scream => (
        <Scream key={scream.screamId} scream={scream} />
      ))
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={1}>
        <Grid item sm={8} xm={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xm={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

export default home;
