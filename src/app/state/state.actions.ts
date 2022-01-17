import { createAction, props } from '@ngrx/store';
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  UPDATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
} from './state.constants';
import { IPost } from './state.interface';
// import { IPost } from './state.interface';

export const getAllPostsRequest = createAction(GET_ALL_POSTS_REQUEST);
export const getAllPostsSuccess = createAction(
  GET_ALL_POSTS_SUCCESS,
  props<{ posts: any }>()
);
export const getAllPostsFailure = createAction(
  GET_ALL_POSTS_FAILURE,
  props<{ error: string }>()
);

export const addPostRequest = createAction(
  ADD_POST_REQUEST,
  props<{ post: any }>()
);
export const addPostSuccess = createAction(
  ADD_POST_SUCCESS,
  props<{ post: any }>()
);
export const addPostFailure = createAction(
  ADD_POST_FAILURE,
  props<{ error: string }>()
);

export const deletePostRequest = createAction(
  DELETE_POST_REQUEST,
  props<{ id: number }>()
);

export const deletePostSuccess = createAction(
  DELETE_POST_SUCCESS,
  props<{ id: number }>()
);

export const deletePostFailure = createAction(
  DELETE_POST_FAILURE,
  props<{ error: string }>()
);

export const updatePostRequest = createAction(
  UPDATE_POST_REQUEST,
  props<{ post: any }>()
);

export const updatePostSuccess = createAction(
  UPDATE_POST_SUCCESS,
  props<{ post: any }>()
);
export const updatePostFailure = createAction(
  UPDATE_POST_FAILURE,
  props<{ error: string }>()
);
