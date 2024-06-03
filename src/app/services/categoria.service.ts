import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ICategoria, ICategoriaResponse } from '../interfaces/ICategoria';
import { IApiResponse } from '../interfaces/IApiResponse';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  selectCategorias = (): Observable<ICategoria[]> => {
    return this.http.get<ICategoria[]>(`${this.apiUrl}/api/categorias`);
  };

  getCategoria = (id: string): Observable<ICategoriaResponse> => {
    return this.http.get<ICategoriaResponse>(`${this.apiUrl}/odata/categorias/${id}`,
    {params: new HttpParams().set('$expand', 'librosCategoria')})
    .pipe(map((data) => data));
  }

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
    return this.http.put<IApiResponse>(
      `${this.apiUrl}/api/categorias/${category.id}`,
      category
    );
  };

  delete = (id: string): Observable<IApiResponse> => {
    return this.http.delete<IApiResponse>(
      `${this.apiUrl}/api/categorias/${id}`
    );
  };
}
