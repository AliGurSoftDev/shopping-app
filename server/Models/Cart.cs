public class Cart
{
    public int Id { get; set; }
    public int IsWishlist { get; set; }

    // Navigation property for line items
    public int UserId { get; set; }
    public User? User { get; set; }
    public ICollection<LineItem>? Items { get; set; }
}
