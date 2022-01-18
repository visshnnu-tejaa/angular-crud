import { createReducer, on } from '@ngrx/store';
import {
  addPostFailure,
  addPostRequest,
  addPostSuccess,
  deletePostFailure,
  deletePostSuccess,
  getAllPostsFailure,
  getAllPostsSuccess,
  updatePostSuccess,
} from './state.actions';
import { postsEffect } from './state.effects';
import { initialState, IPost } from './state.interface';

const _reducer = createReducer(
  initialState,
  on(getAllPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts,
    };
  }),
  on(getAllPostsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(addPostSuccess, (state, action) => {
    let post = { ...action.post };
    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  on(addPostFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(deletePostSuccess, (state, action) => {
    let filteredPosts = state.posts.filter((post) => {
      console.log(post);
      return post.id != action.id;
    });
    return {
      ...state,
      posts: filteredPosts,
    };
  }),
  on(deletePostFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(updatePostSuccess, (state, action) => {
    let updatedPosts = state.posts.map((post) => {
      return post.id == action.post.id ? action.post : post;
    });
    return {
      ...state,
      posts: updatedPosts,
    };
  })
);
export function reducer(state: any, action: any) {
  return _reducer(state, action);
}
