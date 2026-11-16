using Plantarium.Modules.Seeds.Application.DTOs;

namespace Plantarium.Modules.Seeds.Application.Interfaces;

public interface ISeedService
{
    Task<SeedResponseDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IEnumerable<SeedResponseDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<SeedResponseDto> CreateAsync(CreateSeedDto dto, CancellationToken cancellationToken = default);
    Task<bool> UpdateAsync(Guid id, UpdateSeedDto dto, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}