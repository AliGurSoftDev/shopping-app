public class ProductImage
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public int DisplayOrder { get; set; } = 0;

    //Navigation Properties
    public Product? Product { get; set; }
}