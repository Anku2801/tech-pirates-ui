import { Injectable } from '@angular/core';
import { ApiService } from 'app/commonconfig/service/api.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private apiService: ApiService) { }

  // Get user details Based on the ID
  getUserList(data) {
    return this.apiService.postData('CTUserList', data);
  }
  
  // Add a New user
  addUser(data) {
    return this.apiService.postData('CTUserAdd', data);
  }

  // Update a existing user
  updateUser(data) {
    return this.apiService.postData('CTUserUpdate', data);
  }
}
