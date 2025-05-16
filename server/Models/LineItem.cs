public class LineItem
{
    public int Id { get; set; }
    public int ProductId { get; set; }   // Foreign key to Product
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice => UnitPrice * Quantity;

    // Foreign keys and navigation properties
    public int? OrderId { get; set; }
    public Order? Order { get; set; }

    public int? CartId { get; set; }
    public Cart? Cart { get; set; }

    public Product? Product { get; set; }  // Remove initialization here
}
