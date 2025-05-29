using ShoppingProject.Common;

public class Order
{
    public int Id { get; set; }
    public int AddressId{ get; set; }
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public OrderStatus Status { get; set; } = 0;
    public decimal TotalAmount { get; set; }

    // Navigation Properties
    public int UserId { get; set; }
    public User? User { get; set; }
    public required ICollection<LineItem> Items { get; set; }
}