using Plantarium.Modules.Seeds.Domain.Entities;

namespace Plantarium.Modules.Seeds.Domain.Interfaces;

public interface ISeedRepository
{
    Task<Seed?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IEnumerable<Seed>> GetAllAsync(CancellationToken cancellationToken = default);
    Task AddAsync(Seed seed, CancellationToken cancellationToken = default);
    Task UpdateAsync(Seed seed, CancellationToken cancellationToken = default);
    Task DeleteAsync(Seed seed, CancellationToken cancellationToken = default);
}