public class CartDto
{
    public int UserId { get; set; }
    public int IsWishlist { get; set; }
    public List<LineItemDto> Items { get; set; } = new();
    public decimal TotalPrice => Items.Sum(i => i.UnitPrice * i.Quantity);
}
