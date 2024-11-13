using Microsoft.EntityFrameworkCore;
using AddressBookAPI.Models;

namespace AddressBookAPI.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; } // Represents the Contacts table in DB

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
