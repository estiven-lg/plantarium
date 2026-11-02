public class CreatePlantDto
{
    public required string Name { get; set; }
    public required string ScientificName { get; set; }
    public required string Description { get; set; }
    public decimal Price { get; set; }
}