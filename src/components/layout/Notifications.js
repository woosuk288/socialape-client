import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
// MUI stuff
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
// Icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

function Notifications(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const user = useSelector(state => state.user, []);
  const { notifications } = user;

  dayjs.extend(relativeTime);

  function handleOpen(e) {
    setAnchorEl(e.target);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  function onMenuOpened() {
    let unreadNotificationsIds = notifications
      .filter(not => !not.read)
      .map(not => not.notificationId);
    unreadNotificationsIds.lennth > 0 &&
      dispatch(markNotificationsRead(unreadNotificationsIds));
  }

  let notificationsIcon;
  if (notifications && notifications.length > 0) {
    const notiLen = notifications.filter(not => not.read === false).length;
    notiLen > 0
      ? (notificationsIcon = (
          <Badge badgeContent={notiLen} color="secondary">
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationsIcon = <NotificationsIcon />);
  } else {
    notificationsIcon = <NotificationsIcon />;
  }

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map(not => {
        const verb = not.type === "like" ? "liked" : "commented on";
        const time = dayjs(not.createdAt).fromNow();
        const iconColor = not.read ? "primary" : "secondary";
        const icon =
          not.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );

        return (
          <MenuItem key={not.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color="default"
              variant="body1"
              to={`/users/${not.recipient}/scream/${not.screamId}`}
            >
              {not.sender} {verb} your scream {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );
  return (
    <Fragment>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </Fragment>
  );
}

export default Notifications;
