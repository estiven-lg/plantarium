
using Microsoft.EntityFrameworkCore;
using Plantarium.Modules.Fruits.Domain.Entities;
using Plantarium.Modules.Fruits.Domain.Interfaces;
using Plantarium.Modules.Fruits.Infrastructure.Persistence;

namespace Plantarium.Modules.Fruits.Infrastructure.Persistence.Repositories;

public class FruitRepository : IFruitRepository
{
    private readonly FruitDbContext _context;

    public FruitRepository(FruitDbContext context)
    {
        _context = context;
    }

    public async Task<Fruit?> GetByIdAsync(Guid id)
    {
        return await _context.Fruits.FindAsync(id);
    }

    public async Task<List<Fruit>> GetAllAsync()
    {
        return await _context.Fruits.ToListAsync();
    }

    public async Task AddAsync(Fruit fruit)
    {
        await _context.Fruits.AddAsync(fruit);
        await _context.SaveChangesAsync();
    }

    public async Task Update(Fruit fruit)
    {
        _context.Fruits.Update(fruit);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var fruit = await _context.Fruits.FindAsync(id);
        if (fruit != null)
        {
            _context.Fruits.Remove(fruit);
            await _context.SaveChangesAsync();
        }
    }
    
    public void Delete(Fruit fruit)
    {
        _context.Fruits.Remove(fruit);
    }

    public Task SaveChangesAsync()
    {
        return _context.SaveChangesAsync();
    }
}