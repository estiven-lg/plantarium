using Plantarium.Modules.Plants.Domain.Entities;

namespace Plantarium.Modules.Plants.Domain.Interfaces;
public interface IPlantRepository
{
    Task<List<Plant>> GetAllAsync();
    Task<Plant?> GetByIdAsync(Guid id);
    Task AddAsync(Plant plant);
    void Update(Plant plant);
    void Delete(Plant plant);
    Task SaveChangesAsync();
}