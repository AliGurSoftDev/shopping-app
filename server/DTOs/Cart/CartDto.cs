public class CartDto
{
    public int UserId { get; set; }
    public List<CartItemDto> Items { get; set; } = new();
    public float TotalPrice => Items.Sum(i => i.UnitPrice * i.Quantity);
}
