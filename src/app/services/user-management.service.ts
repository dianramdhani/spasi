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

  getUserByUsername(username: string) {
    return this.httpClient.get<UserResponse>(`${this.url}/userManagement/users/${username}`);
  }

  getRoles() {
    return this.httpClient.get<string[]>(`${this.url}/userManagement/roles`);
  }

  getUser() {
    return this.httpClient.get<UserResponse[]>(`${this.url}/userManagement/users`);
  }

  createUser(username: string, email: string, role: string) {
    return this.httpClient.post(`${this.url}/userManagement/users`, { username, email, role });
  }


  createUserRegion(username: string, region: string) {
    return this.httpClient.post(`${this.url}/userManagement/users/${username}/region/${region}`, {});
  }

  createUserSite(username: string, siteId: string) {
    return this.httpClient.post(`${this.url}/userManagement/users/${username}/site/${siteId}`, {});
  }

  removeUserRegionByUsername(username: string) {
    return this.httpClient.delete(`${this.url}/userManagement/users/${username}/region`);
  }

  removeUserSiteByUsername(username: string) {
    return this.httpClient.delete(`${this.url}/userManagement/users/${username}/site`);
  }
}

export interface UserResponse {
  username: string,
  email: string,
  password: string,
  role: string
}