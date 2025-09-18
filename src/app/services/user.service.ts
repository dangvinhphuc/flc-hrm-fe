import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  UpdateUserDto,
  User,
  UserRegistration,
  UsersResponseDto,
} from '../interfaces/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  createUser(userRegistration: UserRegistration): Observable<User> {
    const apiUrl = `${this.baseUrl}/user/register`;
    return this.http.post<User>(apiUrl, userRegistration);
  }

  getUsers(
    page: number,
    limit: number,
    keyword: string
  ): Observable<UsersResponseDto> {
    const apiUrl = `${
      this.baseUrl
    }/user/all?page=${page}&limit=${limit}&keyword=${encodeURIComponent(
      keyword
    )}`;
    return this.http.get<UsersResponseDto>(apiUrl);
  }

  toggleActive(userId: string): Observable<User> {
    const apiUrl = `${this.baseUrl}/user/toggle-active/${userId}`;
    return this.http.patch<User>(apiUrl, null);
  }

  deleteUser(userId: string): Observable<User> {
    const apiUrl = `${this.baseUrl}/user/${userId}`;
    return this.http.delete<User>(apiUrl);
  }

  updateUser(updateUserDto: UpdateUserDto): Observable<User> {
    const apiUrl = `${this.baseUrl}/user/${updateUserDto.id}`;
    return this.http.put<User>(apiUrl, updateUserDto);
  }
}
