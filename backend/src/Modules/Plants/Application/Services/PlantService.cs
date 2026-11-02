using Plantarium.Modules.Plants.Domain.Entities;
using Plantarium.Modules.Plants.Domain.Interfaces;

namespace Plantarium.Modules.Plants.Application.Services;

public class PlantService : IPlantService
{
    private readonly IPlantRepository _repository;

    public PlantService(IPlantRepository repository)
    {
        _repository = repository;
    }

    public async Task<PlantResponseDto> CreateAsync(CreatePlantDto dto)
    {
        Plant plant = new Plant(
            name: dto.Name,
            scientificName: dto.ScientificName,
            description: dto.Description,
            price: dto.Price
        );

        await _repository.AddAsync(plant);
        await _repository.SaveChangesAsync();

        return new PlantResponseDto
        {
            Id = plant.Id,
            Name = plant.Name,
            ScientificName = plant.ScientificName,
            Description = plant.Description,
            Price = plant.Price,
            Stock = plant.Stock,
            CreatedAt = plant.CreatedAt,
        };
    }

    public async Task DeleteAsync(Guid id)
    {
        Plant? plant = await _repository.GetByIdAsync(id);
        
        if (plant is null)
        {
            throw new Exception("Plant not found");
        }

         _repository.Delete(plant);
        await _repository.SaveChangesAsync();
    }

    public async Task<List<PlantResponseDto>> GetAllAsync()
    {
        List<Plant> plants = await _repository.GetAllAsync();

        return plants
            .Select(p => new PlantResponseDto
            {
                Id = p.Id,
                Name = p.Name,
                ScientificName = p.ScientificName,
                Description = p.Description,
                Price = p.Price,
                Stock = p.Stock,
                CreatedAt = p.CreatedAt,
            })
            .ToList();
    }

    public async Task<PlantResponseDto?> GetByIdAsync(Guid id)
    {
        Plant? plant = await _repository.GetByIdAsync(id);

        if (plant is null)
        {
            return null;
        }

        return new PlantResponseDto
        {
            Id = plant.Id,
            Name = plant.Name,
            ScientificName = plant.ScientificName,
            Description = plant.Description,
            Price = plant.Price,
            Stock = plant.Stock,
            CreatedAt = plant.CreatedAt,
        };
    }

    public async Task<PlantResponseDto?> UpdateAsync(Guid id, UpdatePlantDto dto)
    {
        Plant? plant = await _repository.GetByIdAsync(id);

        if (plant is null)
        {
            throw new Exception("Plant not found");
        }

        if (dto.Price.HasValue)
        {
            plant.Price = dto.Price.Value;
        }

        if (dto.Stock.HasValue)
        {
            plant.Stock = dto.Stock.Value;
        }

        _repository.Update(plant);
        await _repository.SaveChangesAsync();

        return new PlantResponseDto
        {
            Id = plant.Id,
            Name = plant.Name,
            ScientificName = plant.ScientificName,
            Description = plant.Description,
            Price = plant.Price,
            Stock = plant.Stock,
            CreatedAt = plant.CreatedAt,
        };
    }
}
