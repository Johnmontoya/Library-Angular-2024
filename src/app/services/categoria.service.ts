import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ICategoria } from '../interfaces/ICategoria';
import { IApiResponse } from '../interfaces/IApiResponse';
import {
  ICategoriaResponse,
  ListCategoria,
} from '../interfaces/ICategoriaResponse';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategorias = (): Observable<ICategoriaResponse> => {
    return this.http
      .get<ICategoriaResponse>(`${this.apiUrl}/odata/categorias`)
      .pipe(map((data) => data));
  };

  createCategoria = (category: ICategoria): Observable<IApiResponse> => {
    return this.http.post<IApiResponse>(
      `${this.apiUrl}/api/categorias`,
      category
    );
  };

  updateCategoria = (category: ICategoria): Observable<IApiResponse> => {
    return this.http.put<IApiResponse>(`${this.apiUrl}/api/categorias/${category.id}`, category);
  };

  delete = (id: string): Observable<IApiResponse> => {
    return this.http.delete<IApiResponse>(
      `${this.apiUrl}/api/categorias/${id}`
    );
  };
}
