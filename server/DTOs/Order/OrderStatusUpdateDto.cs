using ShoppingProject.Common;

public class OrderStatusUpdateDto
{
    public int UserId { get; set; }
    public OrderStatusEnum Status { get; set; }
}