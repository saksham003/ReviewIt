import { FETCH_ALL, COMMENT, FETCH_BY_SEARCH, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, START_LOADING, STOP_LOADING } from '../constants/actionTypes';
import * as api from '../api';

export const getPosts = (query) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING });
    const { data } = await api.fetchPosts(query);
    dispatch({type: STOP_LOADING})

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING });
    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: data });
    dispatch({type: STOP_LOADING})

  } catch (error) {
  }
};

export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING });
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
    dispatch({type: STOP_LOADING });
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
  } catch (error) {
    console.log(error.message);
  }
}

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING });
    const { data } = await api.createPost(post);
    history.push(`/posts/${data._id}`);
    dispatch({type: STOP_LOADING });

    dispatch({type: CREATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post); 
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error) 
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({type: DELETE, payload: id})
  } catch (error) {
    console.log(error)
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id); 
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.commentPost(value, id); 
    dispatch({ type: COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
}