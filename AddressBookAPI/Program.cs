using Microsoft.EntityFrameworkCore;
using AddressBookAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Allow requests from Angular app
              .AllowAnyHeader()                   // Allow all headers
              .AllowAnyMethod();                  // Allow all HTTP methods (GET, POST, etc.)
    });
});

// Add MVC services
builder.Services.AddControllers();

var app = builder.Build();

// Use CORS policy
app.UseCors("AllowAngularApp");

// Configure the HTTP request pipeline
app.MapControllers();

app.Run();
