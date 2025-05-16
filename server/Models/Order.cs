using ShoppingProject.Common;

public class Order
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public OrderStatus Status { get; set; } = 0;
    public decimal TotalAmount { get; set; }

    // Navigation Properties
    public User? User { get; set; }
    public required ICollection<LineItem> Items { get; set; }
}