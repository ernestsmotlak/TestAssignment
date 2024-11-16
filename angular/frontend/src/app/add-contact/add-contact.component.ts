import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { Contact } from '../contact.service';

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

  onSubmit() {
    console.log('Data to send to backend:', this.newContact); // Debugging
    this.contactAdded.emit(this.newContact); // Emit the data
    this.newContact = {
      id: 0,
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
    }; // Reset the form
  }
}
