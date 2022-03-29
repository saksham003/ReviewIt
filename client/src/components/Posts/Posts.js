import React from 'react';
import { Grid, CircularProgress, Paper} from '@material-ui/core'
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) return 'No posts';

  return (
    isLoading ? (
      <Paper className={classes.loadingPaper}>
        <CircularProgress size='4em' />
      </Paper>
    ) : (
      <Grid className={classes.container} container alignItems='stretch' spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={6}>
            <Post post={post} setCurrentId={setCurrentId} asRecommendation={false}/>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
