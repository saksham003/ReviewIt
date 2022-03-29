import React from 'react';
import { Grid, CircularProgress, Paper} from '@material-ui/core'
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';
import { Alert } from '@material-ui/lab';

const Posts = ({ setCurrentId, setModalOpen }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) return (
    <Alert severity='error'>No posts found.</Alert>
  );

  return (
    isLoading ? (
      <Paper className={classes.loadingPaper}>
        <CircularProgress size='4em' />
      </Paper>
    ) : (
      <Grid className={classes.container} container alignItems='stretch' spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={4} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} asRecommendation={false} setModalOpen={setModalOpen}/>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
