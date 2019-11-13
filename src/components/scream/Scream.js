import React from "react";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import MyButton from "../../util/MyButton";
import DeleteButton from "./DeleteButton";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

import { useSelector } from "react-redux";

// MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";

const useStyles = makeStyles(theme => ({
  // button: {
  //   margin: theme.spacing(1)
  // },

  card: {
    position: "relative",
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

  const user = useSelector(state => state.user, []);

  const deleteButton =
    user.authenticated && userHandle === user.credentials.handle ? (
      <DeleteButton screamId={screamId} />
    ) : null;

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
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount}</span>
        <ScreamDialog
          screamId={screamId}
          userHandle={userHandle}
          openDialog={props.openDialog}
        />
      </CardContent>
    </Card>
  );
}

Scream.propTypes = {
  scream: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};


export default Scream;
