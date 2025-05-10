public interface ICartRepository : IGenericRepository<Cart>
{
    Task<IEnumerable<Cart>> GetCartByUserId(int userId);
    Task EmptyCartByUserId(int userId);
    Task AddToCart(int userId, int productId, int quantity);
    Task RemoveFromCart(int userId, int productId, int quantity);
}