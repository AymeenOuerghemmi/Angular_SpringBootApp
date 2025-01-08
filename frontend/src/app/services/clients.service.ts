import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private baseUrl = 'http://localhost:8080/clients'; // Backend Spring Boot

  constructor(private http: HttpClient) {}

  getAllClients(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  deleteClient(cin: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${cin}`);
  }

  createClient(client: any): Observable<void> {
    return this.http.post<void>(this.baseUrl, client);
  }

  getClientByCin(cin: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/edit/${cin}`);
  }
  updateClient(client: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, client); // POST dans votre backend pour ajouter ou modifier.
  }
}
