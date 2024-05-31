import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ILoginRequest } from '../interfaces/ILoginRequest';
import { Observable, map } from 'rxjs';
import { IApiResponse } from '../interfaces/IApiResponse';
import { IRegisterRequest } from '../interfaces/IRegisterRequest';
import { IUserDetail } from '../interfaces/IUserDetail';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private userKey = 'user';

  constructor(private http: HttpClient) { }

  login(data: ILoginRequest): Observable<IApiResponse> {
    return this.http
      .post<IApiResponse>(`${this.apiUrl}/auth/login`, data)
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            localStorage.setItem(this.userKey, JSON.stringify(response))
          }
          return response;
        })
      )
  }

  register(data: IRegisterRequest): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(
      `${this.apiUrl}`,
      data
    );
  }

  getToken = (): string | null => {
    const user = localStorage.getItem(this.userKey);
    if (!user) return null;
    const userDetail: IApiResponse = JSON.parse(user);
    return userDetail.token;
  }

  getDetail = (): Observable<IUserDetail> => {
    return this.http.get<IUserDetail>(`${this.apiUrl}/auth/profile`);
  }

  getUserDetail = () => {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    const userDetail = {
      id: decodedToken.nameid,
      userName: decodedToken.name,
      email: decodedToken.email,
      roles: decodedToken.roles || []
    };
    return userDetail;
  }

  isLoggedIn = (): boolean => {
    const token = this.getToken();
    if (!token) return false;
    return true;
  }

  logout = (): void => {
    localStorage.removeItem(this.userKey);
  }

  refreshToken = (data: {
    email: string;
    token: string;
    refreshToken: string;
  }): Observable<IApiResponse> => {
    return this.http.post<IApiResponse>(
      `${this.apiUrl}/auth/refresh-token`,
      data
    )
  };

  getRefreshToken = (): string | null => {
    const user = localStorage.getItem(this.userKey);
    if (!user) return null;
    const userDetail: IApiResponse = JSON.parse(user);
    return userDetail.refreshToken;
  }

}
