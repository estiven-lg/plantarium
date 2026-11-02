
public interface IPlantService
{
    Task<List<PlantResponseDto>> GetAllAsync();
    Task<PlantResponseDto?> GetByIdAsync(Guid id);
    Task<PlantResponseDto> CreateAsync(CreatePlantDto dto);
    Task<PlantResponseDto?> UpdateAsync(Guid id, UpdatePlantDto dto);
    Task DeleteAsync(Guid id);
}