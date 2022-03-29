import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Fab } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

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
  const [open, setOpen] = React.useState(false);

  const handleFormOpen = () => setOpen(true);
  const handleFormClose = () => setOpen(false);

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
      <Container maxWidth="lg">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spaceing={3}
          className={classes.mainContainer}
        >
          <Grid item sm={12} md={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item sm={12} md={4}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                label="Search"
                value={search}
                fullWidth
                variant="outlined"
                onKeyPress={handleKeyPress}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                variant="outlined"
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
              />
              <Button onClick={searchPost} variant='contained' className={classes.searchButton} color='primary'>Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper className={classes.pagination} elevation={6}>
              <Paginate page={page} />
            </Paper>
          </Grid>
        </Grid>
        <Fab color="secondary" className={classes.fab} >
          <AddIcon />
        </Fab>
      </Container>
    </Grow>
  );
};

export default Home;
