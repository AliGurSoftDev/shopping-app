public interface IOrderRepository : IGenericRepository<Order>
{
    Task<IEnumerable<Order>> GetOrdersByUserIdAsync(int userId);
    Task<IEnumerable<Order>> GetOrdersByStatusAsync(string status);
    Task<IEnumerable<Order>> GetOrdersByUserIdAndStatusAsync(int userId, string status);
    Task<Order> CreateOrder(Cart cart);
    Task UpdateOrderStatus(int id, string status);


}