
namespace Plantarium.Modules.Fruits.Application.Interfaces;
public interface IFruitService
{
    Task<List<FruitResponseDto>> GetAllAsync();
    Task<FruitResponseDto?> GetByIdAsync(Guid id);
    Task<FruitResponseDto> CreateAsync(CreateFruitDto dto);
    Task<FruitResponseDto?> UpdateAsync(Guid id, UpdateFruitDto dto);
    Task DeleteAsync(Guid id);
}