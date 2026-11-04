using Microsoft.AspNetCore.Mvc;
using Plantarium.Modules.Fruits.Application.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class FruitsController : ControllerBase
{
    private readonly IFruitService _fruitService;

    public FruitsController(IFruitService fruitService)
    {
        _fruitService = fruitService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var fruits = await _fruitService.GetAllAsync();
        return Ok(fruits);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var fruit = await _fruitService.GetByIdAsync(id);
        if (fruit is null)
        {
            return NotFound();
        }
        return Ok(fruit);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateFruitDto dto)
    {
        var fruit = await _fruitService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = fruit.Id }, fruit);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, UpdateFruitDto dto)
    {
        var updatedFruit = await _fruitService.UpdateAsync(id, dto);
        if (updatedFruit is null)
        {
            return NotFound();
        }

        return Ok(updatedFruit);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            await _fruitService.DeleteAsync(id);
        }
        catch (Exception ex)
        {
            return NotFound(new { message = ex.Message });
        }

        return NoContent();
    }
}