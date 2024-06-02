import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRole } from '../interfaces/IRole';
import { IApiResponse } from '../interfaces/IApiResponse';
import { IRoleResponse } from '../interfaces/IRoleResponse';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRoles = (): Observable<IRoleResponse[]> => {
    return this.http.get<IRoleResponse[]>(`${this.apiUrl}/api/role`);
  };

  getRole = (id: string): Observable<IApiResponse> => {
    return this.http.get<IApiResponse>(`${this.apiUrl}/apirole/${id}`);
  };

  createRole = (data: IRole): Observable<IApiResponse> => {
    return this.http.post<IApiResponse>(`${this.apiUrl}/api/role`, data);
  };

  updateRole = (data: IRole): Observable<IApiResponse> => {
    return this.http.put<IApiResponse>(`${this.apiUrl}/api/role/${data.id}`, data);
  };

  delete = (id: string): Observable<IApiResponse> => {
    return this.http.delete<IApiResponse>(`${this.apiUrl}/api/role/${id}`);
  };
}
