import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import theme from './theme'

export default combineReducers({
  posts: posts,
  auth: auth,
  theme: theme,
});
