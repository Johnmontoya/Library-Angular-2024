import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IAutorApi, IAutor, IAutorResponse } from '../interfaces/IAutor';
import { IApiResponse } from '../interfaces/IApiResponse';

@Injectable({
  providedIn: 'root',
})
export class AutorService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  selectAutor = (): Observable<IAutorApi[]> => {
    return this.http.get<IAutorApi[]>(`${this.apiUrl}/api/autor`);
  };

  getAutor = (id: string): Observable<IAutorResponse> => {
    return this.http
    .get<IAutorResponse>(`${this.apiUrl}/odata/autor/${id}`, 
    {params: new HttpParams().set('$expand', 'librosEscritos')})
    .pipe(map((data) => data));
  }

  getAutors = (): Observable<IAutorResponse> => {
    return this.http
      .get<IAutorResponse>(`${this.apiUrl}/odata/autor`)
      .pipe(map((data) => data));
  };

  createAutor = (autor: IAutor): Observable<IApiResponse> => {
    return this.http.post<IApiResponse>(`${this.apiUrl}/api/autor`, autor);
  };

  updateAutor = (autor: IAutor): Observable<IApiResponse> => {
    return this.http.put<IApiResponse>(`${this.apiUrl}/api/autor/${autor.Id}`, autor)
  }

  delete = (id: string): Observable<IApiResponse> => {
    return this.http.delete<IApiResponse>(`${this.apiUrl}/api/autor/${id}`);
  };
}
