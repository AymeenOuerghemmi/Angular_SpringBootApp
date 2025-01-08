import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComptesService {
  private baseUrl = 'http://localhost:8080/comptes'; // Backend Spring Boot

  constructor(private http: HttpClient) {}

  getAllComptes(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  deleteCompte(rib: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/delete-ajax`, { rib });
  }
  deleteCompteAjax(rib: number): Observable<void> {
  // Envoi de rib en tant que paramètre d'URL
  return this.http.post<void>(`http://localhost:8080/comptes/delete-ajax?rib=${rib}`, {});
}


  createCompteForExistingClient(data: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/create/existing`, data);
  }

  createCompteForNewClient(data: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/create/new`, data);
  }
  getAutocompleteSuggestions(term: string): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:8080/clients/autocomplete?term=${term}`);
}

  updateCompte(compte: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/edit`, compte);
  }
}
