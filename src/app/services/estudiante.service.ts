import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { IEstudiante } from "../interfaces/IEstudiante";
import { HttpClient } from '@angular/common/http';
import { IApiResponse } from "../interfaces/IApiResponse";

@Injectable({
    providedIn: 'root',
  })
export class EstudianteService {
    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient){}

    createEstudiante = (estudiate: IEstudiante): Observable<IApiResponse> => {
        return this.http.post<IApiResponse>(`${this.apiUrl}/api/estudiante`, estudiate);
    }
}