using Microsoft.EntityFrameworkCore;
using Plantarium.Modules.Seeds.Domain.Entities;

namespace Plantarium.Modules.Seeds.Infrastructure.Persistence;

public class SeedDbContext(DbContextOptions<SeedDbContext> options)
    : DbContext(options)
{
    public DbSet<Seed> Seeds => Set<Seed>();
}