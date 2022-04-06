import React, { useEffect, useState } from 'react'
import { Paper, Typography, CircularProgress, Divider, Grid, Chip, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import { useTheme } from "@material-ui/core/styles";
import CommentSection from './CommentSection';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloseIcon from '@material-ui/icons/Close';


import Form from '../Form/Form';
import { deletePost, getPost, getPosts } from '../../actions/posts';
import Post from '../Posts/Post/Post';
import useStyles  from './styles';
import { Rating } from '@material-ui/lab';

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const history = useHistory();
  const classes = useStyles()
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('profile'));


  const handleDeletePost = () => {
    dispatch(deletePost(id))
    history.push('/posts')
  }
  const handleFormOpen = () => setModalOpen(true);
  const handleFormClose = () => {
    setModalOpen(false)
    setAnchorEl(null);
    dispatch(getPost(id))
  };
  
  useEffect(() => {
    if (post?._id === id) {
      dispatch(getPosts({ category: post?.category, tags: post?.tags.join(','), recommend: true }));
      // dispatch(getPostBySearch({ category: post?.category, tags: post?.tags.join(',') }));
    }
  }, [post, dispatch])

  useEffect(() => {
    dispatch(getPost(id))
  },[id, dispatch])

  if (!post) return null;

  if(isLoading || post._id !== id) return (
    <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size='7em' />
    </Paper>
  )

  // const onTagClick = (tag) => {
  //   history.push(`/posts/search?tags=${tag}`)
  //   dispatch(getPostBySearch({ tags: tag }));
  // }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper style={{ padding: '20px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
        <div className={classes.section}>
          <Typography variant="h3" component="div" style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
            {post.title} <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} > <MoreVertIcon/> </IconButton> 
            {user && <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} >
              <MenuItem onClick={handleFormOpen}>Edit</MenuItem>
              <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
            </Menu>}
            </Typography>
          <div className={classes.ratingContainer} >
            <div className={classes.chipGrid}>
              <Chip color='primary' style={{margin: '3px'}} label={`${post.category}`} />
              {post.tags.map((tag) => (
                <Chip style={{margin: '3px'}} label={`${tag}`} key={`${tag}`} 
                onClick={() => {
                  history.push(`/posts?page=1&tags=${tag}`)
                  dispatch(getPosts({ tags: tag }));
                }} />
              ))}
            </div>
            <Rating value={post.rating} size='large' readOnly/>
          </div>
          <Typography gutterBottom variant="body1" component="div" className={classes.displayLinebreak}>{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          {/* <Divider style={{ margin: '20px 0' }} /> */}
        </div>
      </div>

      {recommendedPosts.length > 0 && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider/>
          <div  width="500px"className={classes.recommendedPosts}>
              <Grid className={classes.container} container alignItems='stretch' spacing={isMobile ? 1 : 3}>
                {recommendedPosts.map((recPost) => (
                  <Grid key={recPost._id} item xs={6} sm={6} md={3} lg={3}>
                    <Post post={recPost} asRecommendation={true}/>
                  </Grid>
                ))}
              </Grid>

          </div>
        </div>
      )}

      <Dialog open={modalOpen} onClose={handleFormClose} >
        <DialogTitle className={classes.modalTitle} onClose={handleFormClose}>
          <div>Add Review</div>
          <IconButton className={classes.closeButton}  onClick={handleFormClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Form currentId={id} handleFormClose={handleFormClose} />
        </DialogContent>
      </Dialog>
    </Paper>
  )
}

export default PostDetails
