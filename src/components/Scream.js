import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import MyButton from "../util/MyButton";
import DeleteButton from "./DeleteButton";
import ScreamDialog from "./ScreamDialog";

import { useSelector, useDispatch } from "react-redux";
import {
  likeScream as likeScreamAct,
  unlikeScream as unlikeScreamAct
} from "../redux/actions/dataActions";

// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
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
  const dispatch = useDispatch();

  function likedScream() {
    if (user.likes && user.likes.find(like => like.screamId === screamId))
      return true;
    else return false;
  }
  function unlikeScream() {
    dispatch(unlikeScreamAct(screamId));
  }
  function likeScream() {
    dispatch(likeScreamAct(screamId));
  }

  const likeButton = !user.authenticated ? (
    <MyButton tip="Like">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </MyButton>
  ) : likedScream() ? (
    <MyButton tip="Undo like" onClick={unlikeScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Undo like" onClick={likeScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );

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
        {likeButton} <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount}</span>
        <ScreamDialog screamId={screamId} userHandle={userHandle} />
      </CardContent>
    </Card>
  );
}

export default Scream;
