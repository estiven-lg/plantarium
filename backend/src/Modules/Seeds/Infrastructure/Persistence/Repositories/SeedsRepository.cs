using Microsoft.EntityFrameworkCore;
using Plantarium.Modules.Seeds.Domain.Entities;
using Plantarium.Modules.Seeds.Domain.Interfaces;

namespace Plantarium.Modules.Seeds.Infrastructure.Persistence.Repositories;

public class SeedsRepository : ISeedRepository
{
    private readonly SeedDbContext _context;

    public SeedsRepository(SeedDbContext context)
    {
        _context = context;
    }

    public async Task<Seed?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.Seeds.FindAsync(new object[] { id }, cancellationToken);
    }

    public async Task<IEnumerable<Seed>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Seeds.ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Seed seed, CancellationToken cancellationToken = default)
    {
        await _context.Seeds.AddAsync(seed, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Seed seed, CancellationToken cancellationToken = default)
    {
        _context.Seeds.Update(seed);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Seed seed, CancellationToken cancellationToken = default)
    {
        _context.Seeds.Remove(seed);
        await _context.SaveChangesAsync(cancellationToken);
    }
}