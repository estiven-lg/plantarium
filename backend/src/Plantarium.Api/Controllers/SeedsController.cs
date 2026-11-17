using Microsoft.AspNetCore.Mvc;
using Plantarium.Modules.Seeds.Application.DTOs;
using Plantarium.Modules.Seeds.Application.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class SeedsController : ControllerBase
{
    private readonly ISeedService _seedService;

    public SeedsController(ISeedService seedService)
    {
        _seedService = seedService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SeedResponseDto>>> GetAll(CancellationToken cancellationToken)
    {
        var seeds = await _seedService.GetAllAsync(cancellationToken);
        return Ok(seeds);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SeedResponseDto>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var seed = await _seedService.GetByIdAsync(id, cancellationToken);
        if (seed is null)
        {
            return NotFound();
        }

        return Ok(seed);
    }

    [HttpPost]
    public async Task<ActionResult<SeedResponseDto>> Create(CreateSeedDto dto, CancellationToken cancellationToken)
    {
        var seed = await _seedService.CreateAsync(dto, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = seed.Id }, seed);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<SeedResponseDto>> Update(Guid id, UpdateSeedDto dto, CancellationToken cancellationToken)
    {
        var updated = await _seedService.UpdateAsync(id, dto, cancellationToken);
        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _seedService.DeleteAsync(id, cancellationToken);
        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}
