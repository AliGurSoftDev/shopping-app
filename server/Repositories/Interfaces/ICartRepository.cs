public interface ICartRepository : IGenericRepository<Cart>
{
    Task<Cart?> GetCartByUserId(int userId, string isWishlist);
    Task<bool> EmptyCartByUserId(int userId, string isWishlist);
    Task AddToCart(int userId, int productId, int quantity, string isWishlist);
    Task<bool> RemoveFromCart(int userId, int productId, int quantity, string isWishlist);
}