public class Cart
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int ProductID { get; set; }
    public int Quantity { get; set; }

    // Navigation Properties
    public User User { get; set; } = new User();
    public Product Product { get; set; } = new Product();
}