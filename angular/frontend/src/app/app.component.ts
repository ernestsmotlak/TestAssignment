import { Component, OnInit } from '@angular/core';
import { ContactService, Contact } from './contact.service';
import { CommonModule } from '@angular/common'; // Required for *ngFor
import { AddContactComponent } from './add-contact/add-contact.component'; // Import AddContactComponent

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, // Marking component as standalone
  imports: [CommonModule, AddContactComponent], // Import AddContactComponent
})
export class AppComponent implements OnInit {
  contacts: Contact[] = [];
  selectedContact: Contact | null = null; // Track the currently selected contact

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContacts().subscribe((data: Contact[]) => {
      this.contacts = data;
    });
  }

  selectContact(contact: Contact) {
    // Toggle the visibility of the selected contact
    if (this.selectedContact === contact) {
      this.selectedContact = null; // Hide details if the same row is clicked again
    } else {
      this.selectedContact = contact; // Show details for the clicked contact
    }
  }

  addContact(newContact: Contact) {
    // Add the new contact to the list
    this.contacts.push({ ...newContact, id: this.contacts.length + 1 });
  }
}
