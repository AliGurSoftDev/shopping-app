public class OrderUpdateDto
{
    public int UserId { get; set; }
    public string? Status { get; set; }
    public List<OrderItemUpdateDto> Items { get; set; } = new();
}