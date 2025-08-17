import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserRegistration } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  createUser(userRegistration: UserRegistration): Observable<User> {
    const apiUrl = `${this.baseUrl}/user/register`;
    return this.http.post<UserRegistration>(apiUrl, userRegistration);
  }
}
