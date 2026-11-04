using Microsoft.EntityFrameworkCore;
using Plantarium.Modules.Plants.Extensions;
using Plantarium.Modules.Fruits.Extensions;
using Plantarium.Modules.Plants.Infrastructure.Persistence;
using Plantarium.Modules.Fruits.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Database
var connectionString = builder.Configuration.GetConnectionString("PlantariumDatabase");

builder.Services.AddDbContext<PlantDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddDbContext<FruitDbContext>(options =>
    options.UseNpgsql(connectionString));

// Application Services
builder.Services.AddPlantsModule();
builder.Services.AddFruitsModule();

var app = builder.Build();

// HTTP Pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
