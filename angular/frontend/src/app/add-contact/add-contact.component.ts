import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { Contact, ContactService } from '../contact.service'; // Import ContactService

@Component({
  selector: 'add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AddContactComponent {
  @Output() contactAdded = new EventEmitter<Contact>(); // Emit new contact to parent

  newContact: Contact = {
    id: 0,
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
  };

  constructor(private contactService: ContactService) {} // Inject the ContactService

  onSubmit() {
    console.log(this.newContact); // Debugging

    // Send the contact to the backend
    this.contactService.addContact(this.newContact).subscribe({
      next: (createdContact) => {
        console.log('Contact successfully created:', createdContact);
        this.contactAdded.emit(createdContact); // Emit the created contact to parent
        this.resetForm(); // Reset the form
      },
      error: (err) => {
        console.error('Error creating contact:', err);
        alert(
          'Failed to create contact: ' + (err.error?.message || 'Unknown error')
        );
      },
    });
  }

  resetForm() {
    this.newContact = {
      id: 0,
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
    };
  }
}
