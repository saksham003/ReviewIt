import React, { useState } from "react";
import { Card, Box, CardActions, CardContent, CardMedia, Button, Typography, Tooltip, Chip, Menu, MenuItem, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
// import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import { useDispatch } from "react-redux";

import useStyles from './styles';
import { likePost } from "../../../actions/posts";
import { useHistory } from "react-router-dom";

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} color="secondary"  />
      <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center" >
        <Typography variant="caption" component="div" color="textSecondary">{`${props.value / 20}/5`}</Typography>
      </Box>
    </Box>
  );
}

const Post = ({ post, setCurrentId, asRecommendation, setModalOpen }) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const history = useHistory();  

  const openPost = () => history.push(`/posts/${post._id}`);

  // const handleFormOpen = (e) => {
  //   e.stopPropagation();
  //   setModalOpen(true);
  //   setCurrentId(post._id);
  // }

  return (
    <Card className={classes.card} raised elevation={3}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
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
        {/* <div className={classes.overlay2}>
          {((user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator ) && !asRecommendation) && (
            <Tooltip title="Edit">
              <Button style={{ color: 'white' }} size="small" onClick={handleFormOpen} >
                <MoreVertIcon fontSize="medium" />
              </Button>
            </Tooltip>
          )}
        </div> */}
        <CardContent>
          { !asRecommendation && <div className={classes.details}>
            <div className={classes.chipGrid}>
              <Chip color='primary' label={`${post.category}`}size='small' />
              {post.tags.map((tag) => (
                <Chip style={{margin: '1px'}} size="small" label={`${tag}`} key={`${tag} in post`} />
              ))}
            </div>
          </div>}
          <Typography variant="h5" gutterBottom>
            {post.title}
          </Typography>
          {!asRecommendation && <Typography variant="body2" color="textSecondary" component="p">
            {post.message.length < 70
              ? post.message
              : post.message.slice(0, 70) + '....'}
          </Typography>}
        </CardContent>
      </ButtonBase>
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
        {/* {((user?.result?.googleId === post?.creator ||
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
        )} */}
        <CircularProgressWithLabel value={ post.rating*20} />

      </CardActions>
    </Card>
  );
};

export default Post;
