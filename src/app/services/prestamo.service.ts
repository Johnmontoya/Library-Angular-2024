import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPrestamos } from '../interfaces/IPrestamo';
import { IApiResponse } from '../interfaces/IApiResponse';

@Injectable({
  providedIn: 'root',
})
export class Prestamos {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createPrestamo = (prestamo: IPrestamos): Observable<IApiResponse> => {
    return this.http.post<IApiResponse>(
      `${this.apiUrl}/api/prestamos`,
      prestamo
    );
  };
}
