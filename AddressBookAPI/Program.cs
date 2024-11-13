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

app.MapGet("/test", async (AppDbContext db) =>
{
    Console.WriteLine("Hi!");
});

app.Run();