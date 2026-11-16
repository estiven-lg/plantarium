
using Plantarium.Modules.Seeds.Application.DTOs;
using Plantarium.Modules.Seeds.Application.Interfaces;
using Plantarium.Modules.Seeds.Domain.Entities;
using Plantarium.Modules.Seeds.Domain.Interfaces;

namespace Plantarium.Modules.Seeds.Application.Services;

public class SeedService : ISeedService
{
    private readonly ISeedRepository _seedRepository;

    public SeedService(ISeedRepository seedRepository)
    {
        _seedRepository = seedRepository;
    }

    public async Task<SeedResponseDto> CreateAsync(CreateSeedDto dto, CancellationToken cancellationToken = default)
    {
        var seed = new Seed(dto.Name, dto.Description);

        await _seedRepository.AddAsync(seed, cancellationToken);

        return MapToResponseDto(seed);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var seed = await _seedRepository.GetByIdAsync(id, cancellationToken);
        if (seed is null)
        {
            return false;
        }

        await _seedRepository.DeleteAsync(seed, cancellationToken);
        return true;
    }

    public async Task<IEnumerable<SeedResponseDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var seeds = await _seedRepository.GetAllAsync(cancellationToken);

        return seeds.Select(MapToResponseDto);
    }

    public async Task<SeedResponseDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var seed = await _seedRepository.GetByIdAsync(id, cancellationToken);

        return seed is null ? null : MapToResponseDto(seed);
    }

    public async Task<bool> UpdateAsync(Guid id, UpdateSeedDto dto, CancellationToken cancellationToken = default)
    {
        var seed = await _seedRepository.GetByIdAsync(id, cancellationToken);
        if (seed is null)
        {
            return false;
        }

        seed.Name = dto.Name;
        seed.Description = dto.Description;
        seed.UpdatedAt = DateTime.UtcNow;

        await _seedRepository.UpdateAsync(seed, cancellationToken);
        return true;
    }

    private static SeedResponseDto MapToResponseDto(Seed seed) => new()
    {
        Id = seed.Id,
        Name = seed.Name,
        Description = seed.Description,
        CreatedAt = seed.CreatedAt,
        UpdatedAt = seed.UpdatedAt
    };
}
