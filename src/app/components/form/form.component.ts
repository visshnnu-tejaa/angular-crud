import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addPostRequest } from 'src/app/state/state.actions';
// import { IPost } from 'src/app/state/state.interface';
import { getPosts } from 'src/app/state/state.selectors';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  posts: any;
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.store.select(getPosts).subscribe((posts) => (this.posts = posts));
  }

  regstrationForm = this.formBuilder.group({
    fname: ['', [Validators.required, Validators.minLength(3)]],
    lname: ['', [Validators.required, Validators.minLength(3)]],
    mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    email: ['', [Validators.required, Validators.email]],
    job: ['', Validators.required],
    date: ['', Validators.required],
    terms: [false, Validators.required],
  });

  submitForm() {
    console.log(this.regstrationForm);
    this.store.dispatch(addPostRequest({ post: this.regstrationForm.value }));
    this.regstrationForm.reset();
  }

  validationErrors(type: string, type1?: string) {
    if (
      this.regstrationForm.get(type)?.touched &&
      this.regstrationForm.get(type)?.invalid
    ) {
      if (type1 == 'pattern') {
        return 'Enter valid number';
      }

      if (this.regstrationForm.get(type)?.errors['required']) {
        return `${type} Required`;
      }
      if (type == 'email') {
        return 'Enter Valid Email';
      }
      if (this.regstrationForm.get(type)?.errors[type1]) {
        return `${type} should be 3 characters long`;
      }
    }
    return '';
  }
}
