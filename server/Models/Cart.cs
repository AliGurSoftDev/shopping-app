public class Cart
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }

    // Navigation property for line items
    public ICollection<LineItem>? Items { get; set; }
}
