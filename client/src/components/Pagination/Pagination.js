import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { getPosts } from '../../actions/posts';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Paginate = ({ page, queries }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const query = useQuery();
  const history = useHistory();
  const { totalPages } = useSelector((state) => state.posts);

  const searchQuery = query.get('search') || '';
  const searchCategory = query.get('category') || '';
  const searchTags = query.get('tags') || '';
  const searchSortBy = query.get('sortBy') || 'NEW';

  useEffect(() => {
    if (searchQuery || searchCategory || searchTags || searchSortBy) {
      dispatch(getPosts({ search:searchQuery, category:searchCategory, tags:searchTags, sortBy:searchSortBy, page, }));
    }else {
      console.log("This is agy")
      dispatch(getPosts({ ...queries, page }));
    }
  },[page, dispatch])

  return (
    <Pagination
      // style={{ width: '50%' }}
      classes={{ ul: classes.ul }}
      count={totalPages}
      page={Number(page) || 1}
      variant="outlined"
      // shape="rounded"
      color="primary"
      renderItem={(item) => { 
        var url = location.search.split('&').splice(1).join('&');
        return <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}&${url}`} />
       }}
    />
  );
};

export default Paginate;
