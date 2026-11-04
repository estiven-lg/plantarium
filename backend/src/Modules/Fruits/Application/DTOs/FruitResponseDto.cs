

public class FruitResponseDto
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string ScientificName { get; set; }
    public required string Description { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
}