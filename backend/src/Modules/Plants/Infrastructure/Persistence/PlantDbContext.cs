
using Microsoft.EntityFrameworkCore;
using Plantarium.Modules.Plants.Domain.Entities;

namespace Plantarium.Modules.Plants.Infrastructure.Persistence;

public class PlantDbContext(DbContextOptions<PlantDbContext> options)
    : DbContext(options)
{
    public DbSet<Plant> Plants => Set<Plant>();
}
