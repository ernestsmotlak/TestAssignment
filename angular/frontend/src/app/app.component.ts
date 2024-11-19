import { Component, OnInit } from '@angular/core';
import { ContactService, Contact } from './contact.service';
import { CommonModule } from '@angular/common';
import { AddContactComponent } from './add-contact/add-contact.component';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, AddContactComponent],
})

export class AppComponent implements OnInit {
  contacts: Contact[] = [];
  currentPage: number = 1; // Track the current page
  pageSize: number = 10; // Default number of items per page
  totalPages: number = 1; // Total number of pages
  selectedContact: Contact | null = null;
  showAddContactForm: boolean = false;
  isUpdateMode: boolean = false;

  // Add the searchCriteria property here
  searchCriteria = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
  };

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.loadContacts(1); // Load the first page of contacts
  }

  loadContacts(page: number) {
    this.contactService
      .getPaginatedContacts(page, this.pageSize, this.searchCriteria)
      .subscribe({
        next: (response) => {
          this.contacts = response.data; // Update contacts
          this.totalPages = response.totalPages; // Update total pages
          this.currentPage = response.page; // Update current page
        },
        error: (err) => {
          console.error('Error fetching contacts:', err);
          alert('Failed to load contacts.');
        },
      });
  }

  searchContacts() {
    this.loadContacts(1); // Reload contacts with search criteria
  }

  clearSearch() {
    this.searchCriteria = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
    };
    this.loadContacts(1); // Reload all contacts
  }

  // Update page size and reload contacts
  updatePageSize(newPageSize: number) {
    this.pageSize = newPageSize; // Update page size
    this.loadContacts(1); // Reload contacts for the first page with new size
  }

  // Jump to a specific page
  jumpToPage(newPage: number) {
    if (newPage > 0 && newPage <= this.totalPages) {
      this.loadContacts(newPage);
    } else {
      alert(`Please enter a page number between 1 and ${this.totalPages}`);
    }
  }

  toggleAddContactForm() {
    this.showAddContactForm = !this.showAddContactForm;
  }

  selectContact(contact: Contact) {
    if (this.selectedContact === contact) {
      this.selectedContact = null;
      this.isUpdateMode = false;
    } else {
      this.selectedContact = contact;
      this.isUpdateMode = false;
    }
  }

  enableUpdateContact() {
    this.isUpdateMode = true;
  }

  updateContact() {
    if (!this.selectedContact) return;

    this.contactService.updateContact(this.selectedContact).subscribe({
      next: () => {
        alert('Contact updated successfully.');
        console.log('Contact updated successfully:', this.selectedContact);

        const index = this.contacts.findIndex(
          (c) => c.id === this.selectedContact!.id
        );

        if (index !== -1) {
          if (this.selectedContact) {
            this.contacts[index] = {
              id: this.selectedContact.id || 0, // Fallback to 0 if undefined
              firstName: this.selectedContact.firstName || '',
              lastName: this.selectedContact.lastName || '',
              address: this.selectedContact.address || '',
              phoneNumber: this.selectedContact.phoneNumber || '',
            };
          }
        }

        this.isUpdateMode = false;
        this.selectedContact = null;
      },
      error: (err) => {
        console.error('Error updating contact:', err);
        alert('Failed to update contact.');
      },
    });
  }

  cancelUpdate() {
    this.isUpdateMode = false;
  }

  addContact(newContact: Contact) {
    this.contacts.push({ ...newContact, id: this.contacts.length + 1 });
  }

  deleteContact(contactId: number) {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(contactId).subscribe({
        next: () => {
          console.log('Contact deleted successfully:', contactId);
          alert('Contact deleted successfully.');

          this.contacts = this.contacts.filter(
            (contact) => contact.id !== contactId
          );

          if (this.selectedContact?.id === contactId) {
            this.selectedContact = null;
            this.isUpdateMode = false;
          }
        },
        error: (err) => {
          console.error('Error deleting contact:', err);
          alert('Failed to delete contact.');
        },
      });
    }
  }
}
