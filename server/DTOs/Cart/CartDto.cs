public class CartDto
{
    public int UserId { get; set; }
    public string IsWishlist { get; set; } = string.Empty;
    public List<LineItemDto> Items { get; set; } = new();
    public decimal TotalPrice => Items.Sum(i => i.UnitPrice * i.Quantity);
}
