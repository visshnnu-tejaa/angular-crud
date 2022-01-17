import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';
import { PostsService } from '../services/posts.service';
import {
  addPostFailure,
  addPostRequest,
  addPostSuccess,
  deletePostFailure,
  deletePostRequest,
  deletePostSuccess,
  getAllPostsFailure,
  getAllPostsRequest,
  getAllPostsSuccess,
  updatePostFailure,
  updatePostRequest,
  updatePostSuccess,
} from './state.actions';

@Injectable({
  providedIn: 'root',
})
export class postsEffect {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private toastr: ToastrService
  ) {}

  getPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllPostsRequest),
      mergeMap((action) => {
        return this.postsService.getPosts().pipe(
          map((posts: any) => {
            getAllPostsFailure({ error: null });

            return getAllPostsSuccess({ posts: posts });
          }),
          catchError((err: any) => {
            console.log(err);

            return of(
              getAllPostsFailure({
                error: this.postsService.setErrorMessage(err.name),
              })
            );
          })
        );
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPostRequest),
      mergeMap((action) => {
        console.log(action);
        return this.postsService.addPost(action.post).pipe(
          map((data: any) => {
            console.log(data);
            this.toastr.success('Post Added');
            return addPostSuccess({ post: data });
          }),
          catchError((err) => {
            console.log(err);
            this.toastr.error('Error Occured, Please Try Again');
            return of(
              addPostFailure({
                error: this.postsService.setErrorMessage(err.name),
              })
            );
          })
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePostRequest),
      mergeMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map((data: any) => {
            this.toastr.success('Post Deleted');
            return deletePostSuccess({ id: action.id });
          }),
          catchError((err) => {
            this.toastr.error('Error Occured, Please Try Again');
            return of(
              deletePostFailure({
                error: this.postsService.setErrorMessage(err.name),
              })
            );
          })
        );
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePostRequest),
      mergeMap((action) => {
        console.log(action);
        return this.postsService.updatePost(action.post).pipe(
          map((data: any) => {
            console.log(data);
            this.toastr.success('Post Updated');
            return updatePostSuccess({ post: action.post });
          }),
          catchError((err) => {
            console.log(err);
            this.toastr.error('Error Occured, Please Try Again');
            return of(
              updatePostFailure({
                error: this.postsService.setErrorMessage(err.name),
              })
            );
          })
        );
      })
    );
  });
}
