import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  baseURL = 'https://localhost:44307/evento';

  constructor(private http: HttpClient) { }

  getEvento(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseURL);
  }

  getEventoTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/getByTema/${tema}`);
  }


  getEventoId(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}/{id}`);
  }

}
