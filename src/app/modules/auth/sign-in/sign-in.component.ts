import { SignIn } from 'src/app/core/auth/auth.actions';
import { Store } from '@ngxs/store';
import { AuthService } from './../../../core/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  loginForm: FormGroup = this._fb.group({
    username: this._fb.control('', Validators.required),
    password: this._fb.control('', Validators.required),
  });

  constructor(private _fb: FormBuilder, private store: Store) {}

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const payload = {
        username,
        password,
      };

      this.store.dispatch(new SignIn(payload));
    }
  }
}
