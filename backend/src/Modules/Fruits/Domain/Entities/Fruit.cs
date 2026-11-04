
namespace Plantarium.Modules.Fruits.Domain.Entities;

public class Fruit
{
    public Fruit(string name, string scientificName, string description, decimal price)
    {
        Id = Guid.NewGuid();
        Name = name;
        ScientificName = scientificName;
        Description = description;
        Price = price;
        CreatedAt = DateTime.UtcNow;
        Stock = 0;
    }

    public Guid Id { get; set; }
    public string Name { get; set; }
    public string ScientificName { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public DateTime CreatedAt { get; set; }
}
