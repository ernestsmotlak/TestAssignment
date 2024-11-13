using Microsoft.EntityFrameworkCore;
using AddressBookAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();



// Map endpoints here
app.MapGet("/data", async (AppDbContext db) =>
{
    return await db.Contacts.ToListAsync();
});

app.MapGet("/specificUser", async(AppDbContext db) => {
    var specificUser = await db.Contacts.Where(contact => contact.FirstName == "Macek").ToListAsync();
    return specificUser;
});



app.Run();