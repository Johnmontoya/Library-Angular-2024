import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPrestamos } from '../interfaces/IPrestamo';
import { IApiResponse } from '../interfaces/IApiResponse';

@Injectable({
  providedIn: 'root',
})
export class PrestamosService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPrestamo = (): Observable<IPrestamos[]> => {
    return this.http.get<IPrestamos[]>(
      `${this.apiUrl}/api/prestamos`,
      {params: new HttpParams().set('$expand', 'estudiante, libro')}
    );
  }

  createPrestamo = (prestamo: IPrestamos): Observable<IApiResponse> => {
    return this.http.post<IApiResponse>(
      `${this.apiUrl}/api/prestamos`,
      prestamo
    );
  };
}
