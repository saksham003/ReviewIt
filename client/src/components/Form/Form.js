import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux';
import { imageNotFound } from '../../constants/imageNotFound';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import { useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';

const initialPostState = { title: '', message: '', tags: '', selectedFile: ''} 

const Form = ({ currentId, setCurrentId}) => {
  const [postData, setPostData] = useState(initialPostState);
  const post = useSelector((state) => currentId? state.posts.posts.find((p) => p._id === currentId) : null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    if (post) setPostData(post);
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    else {
      if (!postData.selectedFile) postData.selectedFile = imageNotFound;
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
    }
    clear()
  };

  const clear = () => {
    setCurrentId(null);
    setPostData(initialPostState);
  };

  if (!user?.result?.name){
    return (
      <Alert severity='error'>You are not Logged In. Please Log In to create a post.</Alert>
    )
  }

  return (
    <div className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        // onSubmit={handleSubmit}
      >
        {/* <Typography vairant="h6"> {currentId ? 'Edit' : 'Add'} a Review</Typography> */}
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}></TextField>
        <TextField name="message" variant="outlined" label="Message" multiline minRows={6} maxRows={6} fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}></TextField>
        <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}></TextField>
        <div className={classes.fileInput}>
          <FileBase type='file' multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})} />
        </div>     
        <Button onClick={handleSubmit} className={classes.buttonSubmit} variant='contained' color='primary' size='large'  fullWidth> 
          Submit
        </Button>
        <Button  variant='contained' color='secondary' size='small' onClick={clear} fullWidth> 
          Clear
        </Button>
      </form>
    </div>
  );
};

export default Form;
