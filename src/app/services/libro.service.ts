import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IApiResponse } from '../interfaces/IApiResponse';
import { ILibro, ILibroResponse } from '../interfaces/ILibro';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLibros = (): Observable<ILibroResponse> => {
    return this.http
      .get<ILibroResponse>(`${this.apiUrl}/odata/libros`, 
      {params: new HttpParams().set('$expand', 'categoria, autor')})
      .pipe(map((data) => data));
  };

  createLibro = (libro: ILibro): Observable<IApiResponse> => {
    return this.http.post<IApiResponse>(`${this.apiUrl}/api/libros`, libro);
  };

  updateLibro = (libro: ILibro): Observable<IApiResponse> => {
    return this.http.put<IApiResponse>(
      `${this.apiUrl}/api/libros/${libro.Id}`,
      libro
    );
  };

  delete = (id: string): Observable<IApiResponse> => {
    return this.http.delete<IApiResponse>(`${this.apiUrl}/api/libros/${id}`);
  };
}
