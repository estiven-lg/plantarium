using Plantarium.Modules.Fruits.Application.Interfaces;
using Plantarium.Modules.Fruits.Domain.Entities;
using Plantarium.Modules.Fruits.Domain.Interfaces;

public class FruitService : IFruitService
{
    private readonly IFruitRepository _repository;

    public FruitService(IFruitRepository repository)
    {
        _repository = repository;
    }

    public async Task<FruitResponseDto> CreateAsync(CreateFruitDto dto)
    {
        Fruit fruit = new Fruit(
            name: dto.Name,
            scientificName: dto.ScientificName,
            description: dto.Description,
            price: dto.Price
        );

        await _repository.AddAsync(fruit);
        await _repository.SaveChangesAsync();

        return new FruitResponseDto
        {
            Id = fruit.Id,
            Name = fruit.Name,
            ScientificName = fruit.ScientificName,
            Description = fruit.Description,
            Price = fruit.Price,
        };
    }

    public Task DeleteAsync(Guid id)
    {
        Fruit? fruit = _repository.GetByIdAsync(id).Result;
        if (fruit is null)
        {
            throw new Exception("Fruit not found");
        }

        _repository.Delete(fruit);
        return _repository.SaveChangesAsync();
    }

    public async Task<List<FruitResponseDto>> GetAllAsync()
    {
        var fruits = await _repository.GetAllAsync();
        return fruits.Select(fruit => new FruitResponseDto
        {
            Id = fruit.Id,
            Name = fruit.Name,
            ScientificName = fruit.ScientificName,
            Description = fruit.Description,
            Price = fruit.Price,
            Stock = fruit.Stock
        }).ToList();
    }

    public async Task<FruitResponseDto?> GetByIdAsync(Guid id)
    {
        var fruit = await _repository.GetByIdAsync(id);
        if (fruit is null)
        {
            return null;
        }

        return new FruitResponseDto
        {
            Id = fruit.Id,
            Name = fruit.Name,
            ScientificName = fruit.ScientificName,
            Description = fruit.Description,
            Price = fruit.Price,
            Stock = fruit.Stock
        };
    }

    public async Task<FruitResponseDto?> UpdateAsync(Guid id, UpdateFruitDto dto)
    {
        var fruit = await _repository.GetByIdAsync(id);
        if (fruit is null)
        {
            return null;
        }

        fruit.Price = dto.Price;
        fruit.Stock = dto.Stock;

        await _repository.Update(fruit);
        await _repository.SaveChangesAsync();

        return new FruitResponseDto
        {
            Id = fruit.Id,
            Name = fruit.Name,
            ScientificName = fruit.ScientificName,
            Description = fruit.Description,
            Price = fruit.Price,
            Stock = fruit.Stock
        };
    }
}
