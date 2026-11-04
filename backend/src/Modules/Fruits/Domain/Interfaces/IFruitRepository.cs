using Plantarium.Modules.Fruits.Domain.Entities;

namespace Plantarium.Modules.Fruits.Domain.Interfaces;
public interface IFruitRepository
{
    Task<List<Fruit>> GetAllAsync();
    Task<Fruit?> GetByIdAsync(Guid id);
    Task AddAsync(Fruit fruit);
    Task Update(Fruit fruit);
    void Delete(Fruit fruit);
    Task SaveChangesAsync();
}