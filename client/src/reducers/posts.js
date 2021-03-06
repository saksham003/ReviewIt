import { FETCH_ALL, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, TAGS, COMMENT, FETCH_BY_SEARCH, START_LOADING, STOP_LOADING } from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [], tags: []}, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true }
    case STOP_LOADING:
      return { ...state, isLoading: false }
    case DELETE:
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) }
    case UPDATE:
    case LIKE:
      return { ...state, posts: state.posts.map((post) => 
        post._id === action.payload._id ? action.payload : post
      )};
    case COMMENT:
      return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload: post) }
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload  }
    case FETCH_POST:
      return { ...state, post: action.payload  }
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] }
    case TAGS:
      return { ...state, tags: action.payload  }
    default:
      return state;
  }
};
