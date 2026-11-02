using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class PlantsController : ControllerBase
{
    private readonly IPlantService _plantService;

    public PlantsController(IPlantService plantService)
    {
        _plantService = plantService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var plants = await _plantService.GetAllAsync();
        return Ok(plants);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var plant = await _plantService.GetByIdAsync(id);
        if (plant is null)
        {
            return NotFound();
        }
        return Ok(plant);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreatePlantDto dto)
    {
        var plant = await _plantService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = plant.Id }, plant);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, UpdatePlantDto dto)
    {
        var updatedPlant = await _plantService.UpdateAsync(id, dto);
        if (updatedPlant is null)
        {
            return NotFound();
        }

        return Ok(updatedPlant);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            await _plantService.DeleteAsync(id);
        }
        catch (Exception ex)
        {
            return NotFound(new { message = ex.Message });
        }

        return NoContent();
    }
}
