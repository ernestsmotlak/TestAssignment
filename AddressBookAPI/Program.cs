using Microsoft.EntityFrameworkCore;
using AddressBookAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add MVC services
builder.Services.AddControllers(); // This is for API controllers, not views

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapControllers(); // This maps the controllers

app.Run();
