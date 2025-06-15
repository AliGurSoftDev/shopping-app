using ShoppingProject.Common;

public class ProductImage
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public int DisplayOrder { get; set; } = 0;
    public string IsThumbnail { get; set; } = GlobalConstants.No;

    //Navigation Properties
    public Product? Product { get; set; }
}