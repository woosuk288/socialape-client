import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  // button: {
  //   margin: theme.spacing(1)
  // },

  card: {
    display: "flex",
    marginBottom: 20
  },
  media: {
    minWidth: 200
    // height: 140
  },
  content: {
    padding: 25
    // objectFit: 'cover'
  }
}));

function Scream(props) {
  const classes = useStyles();
  const {
    scream: {
      body,
      createdAt,
      userImage,
      userHandle,
      screamId,
      likeCount,
      commentCount
    }
  } = props;

  dayjs.extend(relativeTime);

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={userImage}
        title="Profile image"
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  );
}

export default Scream;
