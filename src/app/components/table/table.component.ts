import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  deletePostRequest,
  getAllPostsRequest,
} from 'src/app/state/state.actions';
import { IPost } from 'src/app/state/state.interface';
// import { IPost } from 'src/app/state/state.interface';
import { getError, getPosts } from 'src/app/state/state.selectors';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  posts: any;
  error: string;
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(getAllPostsRequest());
    this.store.select(getPosts).subscribe((posts) => (this.posts = posts));
    this.store.select(getError).subscribe((error) => (this.error = error));
  }

  onDelete(id: number) {
    console.log(id);
    this.store.dispatch(deletePostRequest({ id }));
  }

  onUpdate(post: IPost) {
    console.log(post);
    this.router.navigate(['/edit', post.id]);
  }
}
