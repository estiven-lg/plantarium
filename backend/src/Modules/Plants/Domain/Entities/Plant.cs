namespace Plantarium.Modules.Plants.Domain.Entities;

public class Plant
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public string ScientificName { get; private set; }
    public string Description { get; private set; }
    public decimal Price { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public int Stock { get; private set; }

    public Plant( string name, string scientificName, string description, decimal price)
    {
        Id = Guid.NewGuid();
        Name = name;
        ScientificName = scientificName;
        Description = description;
        Price = price;
        CreatedAt = DateTime.UtcNow;
        Stock = 0;
    }
}