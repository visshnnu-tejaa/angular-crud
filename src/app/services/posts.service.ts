import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { IPost } from '../state/state.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts() {
    let url = 'http://localhost:8000/posts';
    return this.http.get(url);
  }

  addPost(post: any) {
    console.log(post);
    let url = 'http://localhost:8000/posts';
    return this.http.post(url, post, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  deletePost(id: number) {
    let url = `http://localhost:8000/posts/${id}`;
    return this.http.delete(url);
  }

  updatePost(post: any) {
    let url = `http://localhost:8000/posts/${post.id}`;
    return this.http.patch(url, post, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getPost(id: number) {
    let url = `http://localhost:8000/posts/${id}`;
    return this.http.get(url);
  }

  setErrorMessage(err: string) {
    if (err == 'HttpErrorResponse') {
      return 'Error Occured, Please try Again';
    }
    return 'Something went wrong';
  }
}
