import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Service {
  constructor(private http: HttpClient) {}

  getTextFile(filePath: string): Observable<string> {
    return this.http.get(filePath, { responseType: 'text' });
  }
}
