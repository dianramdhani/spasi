import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formLogin: FormGroup;
  error: string;
  spinner = false;

  constructor(private router: Router, private loginService: LoginService) {
    this.formLogin = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  async login() {
    this.spinner = true;
    const { username, password } = this.formLogin.value;
    const { loginSucces } = await this.loginService.login(username, password).toPromise();
    this.spinner = false;
    if (loginSucces) {
      this.router.navigate(['/user/dashboard']);
    } else {
      this.error = 'Login failed!';
    }
  }
}