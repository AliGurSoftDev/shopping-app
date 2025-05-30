public interface ICartRepository : IGenericRepository<Cart>
{
    Task<Cart?> GetCartByUserId(int userId, int isWishlist);
    Task<bool> EmptyCartByUserId(int userId, int isWishlist);
    Task AddToCart(int userId, int productId, int quantity, int isWishlist);
    Task<bool> RemoveFromCart(int userId, int productId, int quantity, int isWishlist);
}