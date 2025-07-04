public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public float Price { get; set; }
    public int Stock { get; set; }
    public int CategoryId { get; set; }
    public int IsFeatured { get; set; }
    public List<ProductImageDto> ImageUrls { get; set; } = new();
}