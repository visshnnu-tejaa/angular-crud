import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { addPostRequest, updatePostRequest } from 'src/app/state/state.actions';
import { getPosts } from 'src/app/state/state.selectors';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
})
export class EditFormComponent implements OnInit {
  posts: any;
  id: number;
  post: any;
  editForm: any;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: Params) => {
      this.id = params['params'].id;
    });
    console.log(this.id);
    this.store.select(getPosts).subscribe((posts) => (this.posts = posts));

    this.post = this.posts.find((post: any) => {
      return post.id == this.id;
    });

    this.editForm = this.formBuilder.group({
      fname: [this.post.fname, [Validators.required, Validators.minLength(3)]],
      lname: [this.post.lname, [Validators.required, Validators.minLength(3)]],
      mobile: [
        this.post.mobile,
        [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)],
      ],
      email: [this.post.email, [Validators.required, Validators.email]],
      job: [this.post.job, Validators.required],
      date: [this.post.date, Validators.required],
      terms: [this.post.terms, Validators.required],
    });
  }

  submitForm() {
    console.log(this.editForm);
    const post = {
      id: this.id,
      fname: this.editForm.value.fname,
      lname: this.editForm.value.lname,
      mobile: this.editForm.value.mobile,
      email: this.editForm.value.email,
      job: this.editForm.value.job,
      date: this.editForm.value.date,
      terms: this.editForm.value.terms,
    };
    this.store.dispatch(updatePostRequest({ post: post }));
    this.editForm.reset();
  }

  validationErrors(type: string, type1?: string) {
    if (this.editForm.get(type)?.touched && this.editForm.get(type)?.invalid) {
      if (type1 == 'pattern') {
        return 'Enter valid number';
      }

      if (this.editForm.get(type)?.errors['required']) {
        return `${type} Required`;
      }
      if (type == 'email') {
        return 'Enter Valid Email';
      }
      if (this.editForm.get(type)?.errors[type1]) {
        return `${type} should be 3 characters long`;
      }
    }
    return '';
  }
}
