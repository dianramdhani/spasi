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
    return this.httpClient.post(`${this.url}/login/login`, { username, password: Md5.hashStr(password) })
      .pipe(
        tap(res => localStorage.setItem(`${this.storagePrefix}-login`, JSON.stringify(true)))
      );
  }

  logout() {
    return this.httpClient.get(`${this.url}/login/logout`)
      .pipe(
        tap(() => localStorage.removeItem(`${this.storagePrefix}-login`))
      );
  }
}