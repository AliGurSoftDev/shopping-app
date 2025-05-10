public class Order
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public string Status { get; set; } = string.Empty;
    public float TotalAmount { get; set; }

    // Navigation Properties
    public User User { get; set; } = new User();
    public ICollection<OrderItem> OrderItems { get; set; }
}