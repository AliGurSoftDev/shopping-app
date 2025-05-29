using ShoppingProject.Common;

public class OrderDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int AddressId { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime OrderDate { get; set; }
    public List<LineItemDto> Items { get; set; } = new();
    public decimal TotalAmount { get; set; }

}
