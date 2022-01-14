import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private readonly http: HttpClient
  ) { }

  login(email: string, password: string) {
    return this.http.post<{user: User; token: string}>(`${this.apiUrl}/login`, {email, password});
  }
  
  register(user: User) {
    return this.http.post<{user: User; message: string}>(`${this.apiUrl}/register`, user);
  }

  userCurrent() {
    return this.http.get<{user: User}>(`${this.apiUrl}/userCurrent`);
  }

}
