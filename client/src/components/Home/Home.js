import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid, Paper, AppBar, Button, Fab, Dialog, DialogTitle, DialogContent, IconButton, Toolbar, InputBase, Select, MenuItem, FormControl, InputLabel  } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
// import ChipInput from 'material-ui-chip-input';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';
import Paginate from '../Pagination/Pagination';
import AddIcon from '@material-ui/icons/Add';
import { CATEGORY, SORT_BY } from '../../constants/enums';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;

  const inititalQueries = { search: '', category: '', sortBy: SORT_BY.NEW, tags: [] };

  const [currentId, setCurrentId] = useState(null);
  const [queries, setQueries] = useState(inititalQueries);
  const [modalOpen, setModalOpen] = useState(false);

  const handleFormOpen = () => setModalOpen(true);
  const handleFormClose = () => setModalOpen(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter')searchPost();
  };

  const onCategoryChange = (ev) => {
    history.push(`/posts?page=${page}&category=${ev.target.value}`);
    setQueries({ ...queries, category: ev.target.value });
    dispatch(getPosts({ ...queries, category: ev.target.value }));
  }
  const onSortChange = (ev) => {
    history.push(`/posts?page=${page}&sortBy=${ev.target.value}`);
    setQueries({ ...queries, sortBy: ev.target.value });
    dispatch(getPosts({ ...queries, sortBy: ev.target.value }));
  }
  // const handleAdd = (tag) => setTags([...tags, tag]);
  // const handleDelete = (tagToDelete) =>
  //   setTags(tags.filter((tag) => tag !== tagToDelete));

  const searchPost = () => {
    if (queries.search.trim() || queries.tags) {
      dispatch(getPosts(queries));
      history.push(`/posts?page=1&search=${queries.search}&tags=${queries.tags.join(',')}&sortBy=${queries.sortBy}&category=${queries.category}`);
    }else {
      history.push(`/`);
    }
  }

  return (
    <Grow in>
      <>
        <Container maxWidth="lg">
          <AppBar className={classes.appBarSearch} position="static" color="inherit" >
            <Toolbar className={classes.toolbar}>
              <div className={classes.left}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}> <SearchIcon /> </div>
                  <InputBase placeholder="Search..." classes={{ root: classes.inputRoot, input: classes.inputInput, }} value={queries.search} onKeyPress={handleKeyPress} onChange={(e) => setQueries({...queries, search: e.target.value})}  />
                </div>
                {/* <ChipInput variant="outlined" className={classes.chipInput} value={tags}  onAdd={handleAdd} onDelete={handleDelete} label="Search Tags" /> */}
                <Button onClick={searchPost} variant='contained' color='primary'>Search</Button>
              </div>
              <div className={classes.right}>
                <FormControl style={{ minWidth: '120px'}}>
                  <InputLabel >Category</InputLabel>
                  <Select variant='standard' value={queries.category} onChange={onCategoryChange} displayEmpty autoWidth >
                    <MenuItem value={CATEGORY.MOVIE}>Movie</MenuItem>
                    <MenuItem value={CATEGORY.TV_SHOW}>TV Show</MenuItem>
                    <MenuItem value={CATEGORY.ANIME}>Anime</MenuItem>
                    {/* <MenuItem value={CATEGORY.MANGA}>Manga</MenuItem>
                    <MenuItem value={CATEGORY.BOOK}>Book</MenuItem> */}
                  </Select>
                </FormControl>
                <FormControl style={{ minWidth: '120px', marginLeft: '20px'}}>
                  <InputLabel >Sort By</InputLabel>
                  <Select variant='standard' value={queries.sortBy} onChange={onSortChange} displayEmpty autoWidth >
                    <MenuItem value={SORT_BY.NEW}>Newest First</MenuItem>
                    <MenuItem value={SORT_BY.OLD}>Oldest First</MenuItem>
                    <MenuItem value={SORT_BY.RATED_HIGH}>Highest Rated</MenuItem>
                    <MenuItem value={SORT_BY.RATED_LOW}>Lowest Rated</MenuItem>
                    <MenuItem value={SORT_BY.LIKED}>Most Liked</MenuItem>
                    <MenuItem value={SORT_BY.COMMENTED}>Most Commented</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Toolbar>
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
              <Form currentId={currentId} handleFormClose={handleFormClose} />
            </DialogContent>
          </Dialog>
        </Container>
        <Paper className={classes.pagination}>
          <Paginate page={page} query={queries} />
        </Paper>
      </>
    </Grow>
  );
};

export default Home;
