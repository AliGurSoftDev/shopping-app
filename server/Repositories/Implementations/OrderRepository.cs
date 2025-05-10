using Microsoft.EntityFrameworkCore;

public class OrderRepository : GenericRepository<Order>, IOrderRepository
{
    private new readonly ApplicationDbContext _context;

    public OrderRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }
    public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(int userId)
    {
        return await _context.Orders
        .Include(o => o.OrderItems)
        .Where(o => o.UserId == userId)
        .ToListAsync();
    }
    public async Task<IEnumerable<Order>> GetOrdersByStatusAsync(string status)
    {
        return await _context.Orders
        .Include(o => o.OrderItems)
        .Where(o => o.Status == status)
        .ToListAsync();
    }
    public async Task<IEnumerable<Order>> GetOrdersByUserIdAndStatusAsync(int userId, string status)
    {
        return await _context.Orders
        .Include(o => o.OrderItems)
        .Where(o => o.UserId == userId && o.Status == status)
        .ToListAsync();
    }
    public override async Task<Order?> GetByIdAsync(int id)
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .FirstOrDefaultAsync(o => o.Id == id);
    }
    public override async Task<IEnumerable<Order>> GetAllAsync()
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .ToListAsync();
    }
}