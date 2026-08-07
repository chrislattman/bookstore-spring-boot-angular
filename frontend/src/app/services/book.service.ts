import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getBooks(search?: string, genre?: string): Observable<Book[]> {
    let params = new HttpParams();
    if (search && search.trim() !== '') {
      params = params.set('search', search.trim());
    }
    if (genre && genre.trim() !== '' && genre !== 'All') {
      params = params.set('genre', genre.trim());
    }
    return this.http.get<Book[]>(`${this.apiUrl}/books`, { params });
  }

  getGenres(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/genres`);
  }
}
