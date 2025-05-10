public class OrderCreateDto
{
    public int UserId { get; set; }
    public string status { get; set; } = string.Empty;
    public List<OrderItemCreateDto> Items { get; set; } = new();
}