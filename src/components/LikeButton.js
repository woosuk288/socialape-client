import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import MyButton from "../util/MyButton";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import { useSelector, useDispatch } from "react-redux";
import {
  likeScream as likeScreamAct,
  unlikeScream as unlikeScreamAct
} from "../redux/actions/dataActions";

function LikeButton(props) {
  const user = useSelector(state => state.user, []);
  const dispatch = useDispatch();

  function likedScream() {
    if (user.likes && user.likes.find(like => like.screamId === props.screamId))
      return true;
    else return false;
  }
  function unlikeScream() {
    dispatch(unlikeScreamAct(props.screamId));
  }
  function likeScream() {
    dispatch(likeScreamAct(props.screamId));
  }

  const likeButton = !user.authenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedScream() ? (
    <MyButton tip="Undo like" onClick={unlikeScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Undo like" onClick={likeScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );

  return likeButton;
}

LikeButton.proptypes = {
  screamId: PropTypes.string.isRequired
};

export default LikeButton;
