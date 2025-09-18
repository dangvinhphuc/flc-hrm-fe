import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  LoginResponseDto,
  User,
  UserLogin,
} from '../interfaces/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private _user = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this._user.asObservable();
  private userStorageKey = 'user';
  private accessTokenStorageKey = 'accessToken';

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem(this.userStorageKey);
    if (savedUser) {
      this._user.next(JSON.parse(savedUser));
    }
  }

  login(userLogin: UserLogin): Observable<LoginResponseDto> {
    const apiUrl = `${this.baseUrl}/auth/login`;
    return this.http.post<LoginResponseDto>(apiUrl, userLogin);
  }

  setSignIn(loginResponse: LoginResponseDto) {
    this._user.next(loginResponse.user);
    localStorage.setItem('accessToken', loginResponse.accessToken);
    localStorage.setItem('user', JSON.stringify(loginResponse.user));
  }

  setSignOut() {
    this._user.next(null);
    localStorage.removeItem(this.userStorageKey);
    localStorage.removeItem(this.accessTokenStorageKey);
  }

  getCurrentUser(): User | null {
    return this._user.value;
  }
}
