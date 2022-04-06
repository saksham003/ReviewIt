import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    if (user){
        req.headers.Authorization = `Bearer ${user?.token}`
    }
    return req;
});

export const fetchPosts = async (query) => {
  var url = `/posts?page=${query.page ||  1}`;
  if (query.category) url += `&category=${query.category}`;
  if (query.search) url += `&search=${query.search}`;
  if (query.tags) url += `&tags=${query.tags}`;
  if (query.sortBy) url += `&sortBy=${query.sortBy}`;
  if (query.recommend) url += `&recommend=${query.recommend}`;
  const res = await API.get(url);
  return res;
}
//  API.get(`/posts?page=${query.page}&category=${searchQuery.category || ''}&searchQuery=${searchQuery.search || ''}&tags=${searchQuery.tags || ''}&sortBy=${searchQuery.sortBy || ''}`);
// }
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = async (searchQuery) =>{
  const res = await API.get(`/posts/search?category=${searchQuery.category || ''}&search=${searchQuery.search || ''}&tags=${searchQuery.tags || ''}&sortBy=${searchQuery.sortBy || ''}`);
  return res;
}
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const commentPost = (value, id) => API.post(`posts/${id}/comments`, { value });

export const signIn = (formData) => API.post('/users/signIn', formData)
export const signUp = (formData) => API.post('/users/signUp', formData)

export const getTags = () => API.get('/posts/tags');