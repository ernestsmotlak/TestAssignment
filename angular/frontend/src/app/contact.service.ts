import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://localhost:5136/api/contacts'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Method to fetch paginated contacts
  getPaginatedContacts(
    page: number,
    pageSize: number,
    searchCriteria: {
      firstName?: string;
      lastName?: string;
      phoneNumber?: string;
    }
  ): Observable<any> {
    let params = `?page=${page}&pageSize=${pageSize}`;
    if (searchCriteria.firstName) {
      params += `&firstName=${searchCriteria.firstName}`;
    }
    if (searchCriteria.lastName) {
      params += `&lastName=${searchCriteria.lastName}`;
    }
    if (searchCriteria.phoneNumber) {
      params += `&phoneNumber=${searchCriteria.phoneNumber}`;
    }
    const url = `${this.apiUrl}${params}`;
    return this.http.get<any>(url);
  }

  // Method to create a new contact
  addContact(contact: Contact): Observable<Contact> {
    const createContactUrl = `${this.apiUrl}/new`; // Target /api/contacts/new
    return this.http.post<Contact>(createContactUrl, contact);
  }
  updateContact(contact: Contact): Observable<void> {
    const url = `${this.apiUrl}/${contact.id}`; // API endpoint: /api/contacts/{id}
    return this.http.put<void>(url, contact);
  }

  deleteContact(contactId: number): Observable<void> {
    const url = `${this.apiUrl}/${contactId}`; // API endpoint: /api/contacts/{id}
    return this.http.delete<void>(url);
  }
}
