import React, { useState, useEffect } from "react";
import axios from "axios";
import Scream from "../components/scream/Scream";
import StaticProfile from "../components/profile/StaticProfile";
import Grid from "@material-ui/core/Grid";

import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../redux/actions/dataActions";

function UserProfile(props) {
  // const screamId = props.match.params.screamId;
  const handle = props.match.params.handle;

  const data = useSelector(state => state.data, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile(handle));
  }, []);

  const { screams, loading, profile } = data;

  const screamsMarkup = loading ? (
    // <ScreamSkeleton />
    <p>...Loaidng data </p>
  ) : screams === null ? (
    <p>No screams from this user</p>
  ) : (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  );

  // !screamId ? (
  //   screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  // ) : (
  //   screams.map(scream => {
  //     if (scream.screamId !== screamId)
  //       return <Scream key={scream.screamId} scream={scream} />;
  //     else return <Scream key={scream.screamId} scream={scream} openDialog />;
  //   })
  // );

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null || profile.handle !== handle ? (
          // <ProfileSkeleton />
          <p> Loaidng Profile...</p>
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
}

function user(props) {
  return <UserProfile {...props} />;
}

export default user;
