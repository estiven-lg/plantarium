
using Microsoft.EntityFrameworkCore;
using Plantarium.Modules.Fruits.Domain.Entities;

namespace Plantarium.Modules.Fruits.Infrastructure.Persistence;

public class FruitDbContext(DbContextOptions<FruitDbContext> options)
    : DbContext(options)
{
    public DbSet<Fruit> Fruits => Set<Fruit>();
}
