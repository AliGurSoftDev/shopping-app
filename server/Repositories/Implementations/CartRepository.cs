using System.IO.Compression;
using Microsoft.EntityFrameworkCore;

public class CartRepository : GenericRepository<Cart>, ICartRepository
{
    private new readonly ApplicationDbContext _context;

    public CartRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Cart>> GetCartByUserId(int userId)
    {
        return await _context.Carts
        .Include(c => c.Product)
        .Where(c => c.UserId == userId)
        .ToListAsync();
    }
    public async Task EmptyCartByUserId(int userId)
    {
        var cartItems = await _context.Carts
            .Where(c => c.UserId == userId)
            .ToListAsync();

        _context.Carts.RemoveRange(cartItems);
    }
    public async Task AddToCart(int userId, int productId, int quantity)
    {
        var existingCartItem = await _context.Carts
           .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductID == productId);

        if (existingCartItem != null)
        {
            existingCartItem.Quantity += quantity;
            _context.Carts.Update(existingCartItem);
        }
        else
        {
            var newCartItem = new Cart
            {
                UserId = userId,
                ProductID = productId,
                Quantity = quantity
            };
            await _context.Carts.AddAsync(newCartItem);
        }
    }
    public async Task RemoveFromCart(int userId, int productId, int quantity)
    {
        var existingCartItem = await _context.Carts
            .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductID == productId);

        if (existingCartItem != null)
        {
            if (existingCartItem.Quantity > quantity)
            {
                existingCartItem.Quantity -= quantity;
                _context.Carts.Update(existingCartItem);
            }
            else
            {
                _context.Carts.Remove(existingCartItem);
            }
        }
    }
}