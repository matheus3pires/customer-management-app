import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientRequestPayload } from '../payload/client-payload';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private apiUrl = 'http://localhost:8080/totvs/clients';

  constructor(private http: HttpClient) {}

  /**
   * Create a new client.
   * @param payload The client data to create.
   * @returns An observable of the created client.
   */
  createClient(payload: ClientRequestPayload): Observable<ClientRequestPayload> {
    return this.http.post<ClientRequestPayload>(this.apiUrl, payload);
  }

  /**
   * Fetch a client by CPF.
   * @param cpf The client unique identifier.
   * @returns An observable of the client.
   */
  getClientByCpf(cpf: string): Observable<ClientRequestPayload> {
    return this.http.get<ClientRequestPayload>(`${this.apiUrl}/${cpf}`);
  }

  /**
   * Fetch all clients.
   * @returns An observable of the list of clients.
   */
  getAllClients(): Observable<ClientRequestPayload[]> {
    return this.http.get<ClientRequestPayload[]>(this.apiUrl);
  }

  /**
   * Update an existing client.
   * @param cpf The client unique identifier.
   * @param payload The new client data.
   * @returns An observable of the updated client.
   */
  updateClient(cpf: string, payload: ClientRequestPayload): Observable<ClientRequestPayload> {
    return this.http.put<ClientRequestPayload>(`${this.apiUrl}/${cpf}`, payload);
  }

  /**
   * Delete a client by CPF.
   * @param cpf The client unique identifier.
   * @returns An observable of void.
   */
  deleteClient(cpf: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cpf}`);
  }
}
