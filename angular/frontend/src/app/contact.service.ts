import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define and export the Contact interface
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
  private apiUrl = 'http://localhost:5136/api/contacts/'; // Base API endpoint

  constructor(private http: HttpClient) {}

  // Method to get all contacts
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl); // Return an Observable of Contact array
  }

  // Method to create a new contact
  addContact(contact: Contact): Observable<Contact> {
    const createContactUrl = `${this.apiUrl}new`; // Target /api/contacts/new
    return this.http.post<Contact>(createContactUrl, contact);
  }
}
