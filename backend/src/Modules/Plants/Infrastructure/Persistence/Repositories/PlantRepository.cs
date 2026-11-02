using Microsoft.EntityFrameworkCore;
using Plantarium.Modules.Plants.Domain.Entities;
using Plantarium.Modules.Plants.Domain.Interfaces;
using Plantarium.Modules.Plants.Infrastructure.Persistence;

public class PlantRepository : IPlantRepository
{
    private readonly PlantDbContext _context;

    public PlantRepository(PlantDbContext context)
    {
        _context = context;
    }

    public Task AddAsync(Plant plant)
    {
        return _context.Plants.AddAsync(plant).AsTask();
    }

    public void Delete(Plant plant)
    {
         _context.Plants.Remove(plant);
    }

    public Task<List<Plant>> GetAllAsync()
    {
        return _context.Plants.ToListAsync();
    }

    public Task<Plant?> GetByIdAsync(Guid id)
    {
        return _context.Plants.FirstOrDefaultAsync(p => p.Id == id);
    }

    public Task SaveChangesAsync()
    {
        return _context.SaveChangesAsync();
    }

    public void Update(Plant plant)
    {
        _context.Plants.Update(plant);
    }
}