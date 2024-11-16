import { Component, OnInit } from '@angular/core';
import { ContactService, Contact } from './contact.service';
import { CommonModule } from '@angular/common'; // Required for *ngFor
import { AddContactComponent } from './add-contact/add-contact.component'; // Import AddContactComponent
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, // Marking component as standalone
  imports: [CommonModule, FormsModule, AddContactComponent], // Import AddContactComponent
})
export class AppComponent implements OnInit {
  contacts: Contact[] = [];
  selectedContact: Contact | null = null; // Track the currently selected contact
  showAddContactForm: boolean = false; // Control visibility of Add Contact form
  isUpdateMode: boolean = false; // Flag to toggle update form

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContacts().subscribe((data: Contact[]) => {
      this.contacts = data;
    });
  }

  toggleAddContactForm() {
    this.showAddContactForm = !this.showAddContactForm; // Toggle visibility
  }

  selectContact(contact: Contact) {
    // Toggle the visibility of the selected contact
    if (this.selectedContact === contact) {
      this.selectedContact = null; // Hide details if the same row is clicked again
      this.isUpdateMode = false; // Reset update mode
    } else {
      this.selectedContact = contact; // Show details for the clicked contact
      this.isUpdateMode = false; // Ensure update mode is off
    }
  }

  enableUpdateContact() {
    this.isUpdateMode = true; // Enable update mode
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
          const updatedContact: Contact = {
            id: this.selectedContact!.id || 0,
            firstName: this.selectedContact!.firstName || '',
            lastName: this.selectedContact!.lastName || '',
            address: this.selectedContact!.address || '',
            phoneNumber: this.selectedContact!.phoneNumber || '',
          };

          this.contacts[index] = updatedContact;
        }

        this.isUpdateMode = false; // Exit update mode
        this.selectedContact = null; // Reset selected contact
      },
      error: (err) => {
        console.error('Error updating contact:', err);
        alert('Failed to update contact.');
      },
    });
  }

  cancelUpdate() {
    this.isUpdateMode = false; // Exit update mode
  }

  addContact(newContact: Contact) {
    // Add the new contact to the list
    this.contacts.push({ ...newContact, id: this.contacts.length + 1 });
  }
}
