import React, { useState, useRef } from 'react'
import { Typography, TextField, Button, Paper } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import useStyles from './styles'
import { commentPost } from '../../actions/posts';

const CommentSection = ({post}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef(null);

    const handleClick = async () => {
        const finalComment = `${user?.result?.name}: ${comment}`;
        const updatedComments = await dispatch(commentPost(finalComment, post._id));
        setComments(updatedComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <div>
      <div className={classes.commentOuterContainer}>
        <Paper elevation={0} variant='outlined' className={classes.commentInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}</strong>: {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </Paper>
        { user?.result?.name && (
          <div styles={{ width: '70%' }}>
            <Typography gutterBottom variant="subtitle1">Write a comment</Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button fullWidth disabled={!comment} variant='contained' onClick={handleClick}>Comment</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentSection