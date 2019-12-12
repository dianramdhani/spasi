import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  error: string;
  spinner = false;

  constructor(private router: Router, private loginService: LoginService) {
    this.formLogin = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  async ngOnInit() {
    await this.loginService.logout().toPromise();
  }

  async login() {
    this.spinner = true;
    const { username, password } = this.formLogin.value;
    const res = await this.loginService.login(username, password).toPromise();
    this.spinner = false;
    this.router.navigate(['/user/dashboard']);

    /**
     * @todo
     * use it if login has response
     */
    // if (res) {
    //   this.router.navigate(['/user/dashboard']);
    // } else {
    //   this.error = 'Login failed!';
    // }
  }
}