using System.IO.Compression;
using Microsoft.EntityFrameworkCore;

public class CartRepository : GenericRepository<Cart>, ICartRepository
{
    private new readonly ApplicationDbContext _context;

    public CartRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }
    public override async Task<IEnumerable<Cart>> GetAllAsync()
    {
        return await _context.Carts
        .Include(c => c.Items)
        .ThenInclude(i => i.Product)
        .ToListAsync();
    }

    public override async Task<Cart?> GetByIdAsync(int id)
    {
        return await _context.Carts
        .Include(c => c.Items)
        .ThenInclude(i => i.Product)
        .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<Cart?> GetCartByUserId(int userId)
    {
        return await _context.Carts
        .Include(c => c.Items)
        .ThenInclude(i => i.Product)
        .FirstOrDefaultAsync(c => c.UserId == userId);
    }
    public async Task AddToCart(int userId, int productId, int quantity)
    {
        var cart = await GetCartByUserId(userId);

        if (cart == null)
        {
            cart = new Cart { UserId = userId };
            await _context.Carts.AddAsync(cart);
            await _context.SaveChangesAsync();
        }

        var existingItem = cart.Items.FirstOrDefault(i => i.ProductId == productId);

        if (existingItem != null)
        {
            existingItem.Quantity += quantity;
        }
        else
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return;

            var newItem = new LineItem
            {
                ProductId = productId,
                Quantity = quantity,
                UnitPrice = product.Price,
                CartId = cart.Id,
                //Product = product  // Explicitly set the product reference
            };

            cart.Items.Add(newItem);
        }
    }

    public async Task<bool> RemoveFromCart(int userId, int productId, int quantity)
    {
        var cart = await GetCartByUserId(userId);
        if (cart == null) return false;

        var existingItem = cart.Items.FirstOrDefault(i => i.ProductId == productId);
        if (existingItem == null) return false;

        if (existingItem.Quantity > quantity)
        {
            existingItem.Quantity -= quantity;
        }
        else
        {
            _context.LineItems.Remove(existingItem);
        }

        return true;
    }
    public async Task<bool> EmptyCartByUserId(int userId)
    {
        var cart = await GetCartByUserId(userId);
        if (cart == null) return false;

        _context.LineItems.RemoveRange(cart.Items);
        //_context.Carts.Remove(cart);

        return true;
    }
}