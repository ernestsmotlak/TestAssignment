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

        // Additional actions can be added for creating, updating, deleting, etc.
    }
}
