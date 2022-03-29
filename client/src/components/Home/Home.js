import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton, Slide } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import CloseIcon from '@material-ui/icons/Close';

import { getPostBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';
import Paginate from '../Pagination/Pagination';
import AddIcon from '@material-ui/icons/Add';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleFormOpen = () => setModalOpen(true);
  const handleFormClose = () => setModalOpen(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('search') || '';

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',') || 'none'}`);
    }else {
      history.push(`/`);
    }
  }

  return (
    <Grow in>
      <>
        <Container maxWidth="lg">
          <AppBar className={classes.appBarSearch} position="static" color="inherit" >
            <TextField className={classes.search} variant='outlined' name="search" label="Search" value={search} onKeyPress={handleKeyPress} onChange={(e) => setSearch(e.target.value)} />
            <ChipInput variant='outlined' className={classes.chipInput} value={tags}  onAdd={handleAdd} onDelete={handleDelete} label="Search Tags" />
            <Button onClick={searchPost} variant='contained' color='primary'>Search</Button>
          </AppBar>

          <Grid container justifyContent="space-between" alignItems="stretch" spaceing={3} className={classes.mainContainer}>
            <Grid item sm={12} md={12}>
              <Posts setModalOpen={setModalOpen} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>

          <Fab color="secondary" className={classes.fab} onClick={handleFormOpen} >
            <AddIcon />
          </Fab>
          <Dialog open={modalOpen} onClose={handleFormClose} >
            <DialogTitle className={classes.modalTitle} onClose={handleFormClose}>
              <div>Add Review</div>
              <IconButton className={classes.closeButton}  onClick={handleFormClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </DialogContent>
          </Dialog>
        </Container>
        <Paper className={classes.pagination}>
          <Paginate page={page} />
        </Paper>
      </>
    </Grow>
  );
};

export default Home;
