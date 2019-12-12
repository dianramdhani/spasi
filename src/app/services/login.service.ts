import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string;
  storagePrefix: string;

  constructor(private httpClient: HttpClient) {
    const config = window['config']();
    this.url = config.api;
    this.storagePrefix = config.storagePrefix;
  }

  login(username: string, password: string) {
    return this.httpClient.post<LoginResponse>(`${this.url}/login/login`, { username, password: Md5.hashStr(password) })
      .pipe(
        tap(res => localStorage.setItem(`${this.storagePrefix}-login`, JSON.stringify(res)))
      );
  }

  async logout() {
    const { token }: LoginResponse = JSON.parse(localStorage.getItem(`${this.storagePrefix}-login`));
    if (token) {
      await this.httpClient.post(`${this.url}/login/logout/${token}`, {})
        .pipe(
          tap(() => localStorage.removeItem(`${this.storagePrefix}-login`))
        ).toPromise();
    }
  }

  getUser(): LoginResponse {
    return JSON.parse(localStorage.getItem(`${this.storagePrefix}-login`));
  }
}

interface LoginResponse {
  loginSucces: boolean
  loginTime: string
  logoutSucces: string
  logoutTime: string
  token: string
  username: string
}