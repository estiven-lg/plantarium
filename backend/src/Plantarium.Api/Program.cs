using Microsoft.EntityFrameworkCore;
using Plantarium.Modules.Plants.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Database
var connectionString = builder.Configuration.GetConnectionString("PlantariumDatabase");

builder.Services.AddDbContext<PlantDbContext>(options =>
    options.UseNpgsql(connectionString));


var app = builder.Build();

// HTTP Pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
