import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import ScreamSkeleton from '../util/ScreamSkeleton'

// Reudx
import { useSelector, useDispatch } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

function ScreamList(props) {
  // const [screams, setScreams] = useState(null);
  // useSelector
  const data = useSelector(state => state.data, []);
  const { screams, loading } = data;

  const dispath = useDispatch();

  useEffect(() => {
    dispath(getScreams());
  }, []);

  let recentScreamsMarkup = !loading ? (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    <ScreamSkeleton />
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

function home(props) {
  return <ScreamList {...props} />;
}
export default home;
