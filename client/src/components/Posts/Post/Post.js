import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Tooltip, ButtonBase, Chip } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment';
import { useDispatch } from "react-redux";

import useStyles from './styles';
import { deletePost, likePost } from "../../../actions/posts";
import { useHistory } from "react-router-dom";

const Post = ({ post, setCurrentId, asRecommendation, setModalOpen }) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const history = useHistory();  

  const openPost = () => history.push(`/posts/${post._id}`);

  return (
    <Card className={classes.card} raised elevation={3}>
      <div className={classes.cardAction} onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          {((user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator ) && !asRecommendation) && (
            <Tooltip title="Edit">
              <Button
                style={{ color: 'white' }}
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpen(true);
                  setCurrentId(post._id);
                }}
              >
                <MoreHorizIcon fontSize="medium" />
              </Button>
            </Tooltip>
          )}
        </div>
        <CardContent>
          <div className={classes.details}>
            <div className={classes.chipGrid}>
              {post.tags.map((tag) => (
                <Chip style={{margin: '1px'}} size="small" label={`${tag}`} key={`${tag}`} />
              ))}
            </div>
          </div>
          <Typography variant="h5" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message.length < 90
              ? post.message
              : post.message.slice(0, 90) + '....'}
          </Typography>
        </CardContent>
      </div>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user}
          onClick={() => dispatch(likePost(post._id))}
        >
          {post.likes.includes(user?.result?._id) ||
          post.likes.includes(user?.result?.googleId) ? (
            <ThumbUpAltIcon fontSize="small" />
          ) : (
            <ThumbUpAltOutlinedIcon fontSize="small" />
          )}
          &nbsp; Like &nbsp;
          {post.likes.length}
        </Button>
        {((user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && !asRecommendation) && (
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon fontSize="small" />
            &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
