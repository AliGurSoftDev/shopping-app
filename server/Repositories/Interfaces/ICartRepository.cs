public interface ICartRepository : IGenericRepository<Cart>
{
    Task<Cart?> GetCartByUserId(int userId);
    Task<bool> EmptyCartByUserId(int userId);
    Task AddToCart(int userId, int productId, int quantity);
    Task<bool> RemoveFromCart(int userId, int productId, int quantity);
}