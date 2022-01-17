import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Posts } from './state.interface';

export const getState = createFeatureSelector<Posts>('posts');

export const getPosts = createSelector(getState, (state) => state.posts);
export const getError = createSelector(getState, (state) => state.error);
