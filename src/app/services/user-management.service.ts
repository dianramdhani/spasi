import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  url: string;

  constructor(private httpClient: HttpClient) {
    const config = window['config']();
    this.url = config.api;
  }

  getUserByUsername(username) {
    return this.httpClient.get<UserResponse>(`${this.url}/userManagement/users/${username}`);
  }

  getRoles() {
    return this.httpClient.get<string[]>(`${this.url}/userManagement/roles`);
  }
}

interface UserResponse {
  username: string,
  email: string,
  password: string,
  role: string
}