import React, { useEffect, useState } from 'react';
import { TextField, Button, FormControl, NativeSelect, withStyles, InputBase, Typography } from '@material-ui/core';
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux';
import { imageNotFound } from '../../constants/imageNotFound';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import { useHistory } from 'react-router-dom';
import { Alert, Rating } from '@material-ui/lab';
import { CATEGORY } from '../../constants/enums';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: { borderRadius: 4, position: 'relative', backgroundColor: theme.palette.background.paper, border: '1px solid #ced4da', fontSize: 16, padding: '16px 10px', transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [ '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(','),
    '&:focus': { borderRadius: 4, borderColor: '#80bdff', boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',},
  },
}))(InputBase);

const initialPostState = { title: '', message: '', tags: '', selectedFile: '', rating: 0, category: CATEGORY.MOVIE } ;

const Form = ({ currentId, handleFormClose }) => {
  const [postData, setPostData] = useState(initialPostState);
  const post = useSelector((state) => currentId? state.posts.post : null);
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
    handleFormClose();
  };

  const clear = () => {
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
      >
        {/* <Typography vairant="h6"> {currentId ? 'Edit' : 'Add'} a Review</Typography> */}
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}></TextField>
        <TextField name="message" variant="outlined" label="Message" multiline minRows={6} maxRows={6} fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}></TextField>
        <FormControl style={{ minWidth: '97%'}}>
          {/* <InputLabel >Category</InputLabel> */}
          <NativeSelect value={postData.category} onChange={(e) => setPostData({ ...postData, category: e.target.value })} input={<BootstrapInput />} >
            <option value={CATEGORY.MOVIE}>Movie</option>
            <option value={CATEGORY.TV_SHOW}>TV Show</option>
            <option value={CATEGORY.ANIME}>Anime</option>
            <option value={CATEGORY.MANGA}>Manga</option>
            <option value={CATEGORY.BOOK}>Book</option>
          </NativeSelect>
        </FormControl>
        <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}></TextField>
        <div className={classes.fileInput}>
          <FileBase type='file' multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})} />
        </div>     
        <div style={{ width:'97%', display:'flex', alignItems:'center'}}> 
          <Typography variant='subtitle1' style={{marginRight:'10px'}}> Rating: </Typography>
          <Rating size='large' name="rating" value={postData.rating} onChange={(event, newValue) => { setPostData({ ...postData, rating: newValue }) }} />
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
