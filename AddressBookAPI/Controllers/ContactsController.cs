using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AddressBookAPI.Data;
using AddressBookAPI.Models;

namespace AddressBookAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly AppDbContext _db;

        // Constructor that accepts the AppDbContext (dependency injection)
        public ContactsController(AppDbContext db)
        {
            _db = db;
        }

        // GET: api/contacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            // Fetch all contacts from the database
            var contacts = await _db.Contacts.ToListAsync();
            return Ok(contacts); // Return contacts as JSON
        }

        // GET: api/contacts/specificUser
        [HttpGet("macekmuri")]
        public async Task<ActionResult<IEnumerable<Contact>>> GetSpecificUser()
        {
            // Fetch contacts where the first name is "Macek"
            var specificUser = await _db.Contacts.Where(c => c.FirstName == "Macek").ToListAsync();
            return Ok(specificUser); // Return filtered contacts as JSON
        }

        
        [HttpPost("new")]
        public async Task<ActionResult<Contact>> CreateContact([FromBody] Contact contact)
        {
            if (contact == null)
            {
                return BadRequest("Contact is null.");
            }

            // Check if the phone number already exists
            bool phoneNumberExists = await _db.Contacts.AnyAsync(c => c.PhoneNumber == contact.PhoneNumber);
            if (phoneNumberExists)
            {
                return Conflict(new { message = "A contact with this phone number already exists." });
            }

            // Add the new contact to the database
            _db.Contacts.Add(contact);
            await _db.SaveChangesAsync();

            // Return the created contact with a 201 Created response
            return CreatedAtAction(nameof(GetContacts), new { id = contact.Id }, contact);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(int id, [FromBody] Contact updatedContact)
        {
            if (id != updatedContact.Id)
            {
                return BadRequest("Contact ID mismatch.");
            }

            // Find the existing contact
            var existingContact = await _db.Contacts.FindAsync(id);
            if (existingContact == null)
            {
                return NotFound(new { message = "Contact not found." });
            }

            // Update the contact properties
            existingContact.FirstName = updatedContact.FirstName;
            existingContact.LastName = updatedContact.LastName;
            existingContact.Address = updatedContact.Address;
            existingContact.PhoneNumber = updatedContact.PhoneNumber;

            // Save changes to the database
            await _db.SaveChangesAsync();

            return NoContent(); // Return 204 No Content for successful update
        }
    }
}