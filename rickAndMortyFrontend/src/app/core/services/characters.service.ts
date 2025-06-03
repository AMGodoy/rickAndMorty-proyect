import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../interfaces/characters.interface';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8'
    })
  };

  URL_API: string = `http://localhost:8080/api`;

  findAll(): Observable<any> {
    return this.http.get<any>(`${this.URL_API}/characters`);
  }

  search(name: string): Observable<Character[]> {
    return this.http.get<Character[]>(
      `${this.URL_API}/characters/search`,
      {
        params: { name: name.trim() },
        headers: this.httpOptions.headers,
      }
    );
  }

  getCharacterById(id: number): Observable<Character>{
    return this.http.get<Character>(`${this.URL_API}/characters/${id}`);
  }

  getCharacterPdf(id: number): Observable<Blob> {
  const params = new HttpParams().set('id', id.toString());
  return this.http.get(`${this.URL_API}/characters/character/pdf`, {
    params,
    responseType: 'blob',
    headers: new HttpHeaders().set('Accept', 'application/pdf')
  });
}
}

