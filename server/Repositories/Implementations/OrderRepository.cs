using Microsoft.EntityFrameworkCore;
using ShoppingProject.Common;

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
        .Include(o => o.Items)
        .ThenInclude(i => i.Product)
        .Where(o => o.UserId == userId)
        .ToListAsync();
    }
    public async Task<IEnumerable<Order>> GetOrdersByStatusAsync(string status)
    {
        return await _context.Orders
        .Include(o => o.Items)
        .ThenInclude(i => i.Product)
        .Where(o => o.Status == getOrderStatusEnum(status))
        .ToListAsync();
    }
    public async Task<IEnumerable<Order>> GetOrdersByUserIdAndStatusAsync(int userId, string status)
    {
        return await _context.Orders
        .Include(o => o.Items)
        .ThenInclude(i => i.Product)
        .Where(o => o.UserId == userId && o.Status == getOrderStatusEnum(status))
        .ToListAsync();
    }
    public override async Task<Order?> GetByIdAsync(int id)
    {
        return await _context.Orders
            .Include(o => o.Items)
            .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(o => o.Id == id);
    }
    public override async Task<IEnumerable<Order>> GetAllAsync()
    {
        return await _context.Orders
            .Include(o => o.Items)
            .ThenInclude(i => i.Product)
            .ToListAsync();
    }
    // OrderRepository.cs
    public async Task<Order> CreateOrder(Cart cart)
    {
        if (cart == null || cart.Items == null || !cart.Items.Any())
            throw new ArgumentException("Cart is null or empty.");



        var order = new Order
        {
            UserId = cart.UserId,
            Status = OrderStatus.Pending,
            OrderDate = DateTime.UtcNow,
            Items = cart.Items
        };

        foreach (var item in cart.Items)
        {
            item.CartId = null;
            item.OrderId = order.Id;
            item.UnitPrice = (item.Product != null) ? item.Product.Price : 0;
            order.TotalAmount += item.UnitPrice * item.Quantity;
        }

        try
        {
            await _context.Orders.AddAsync(order);
            return order;
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Error creating the order.", ex);
        }
    }

    public async Task UpdateOrderStatus(int id, string status)
    {
        OrderStatus newStatus;

        if (Enum.TryParse<OrderStatus>(status, true, out newStatus))
        {
            var existingOrder = await GetByIdAsync(id);
            if (existingOrder != null)
            {
                existingOrder.Status = newStatus;
            }
        }
    }

    private OrderStatus getOrderStatusEnum(string status)
    {
        OrderStatus statusEnum;
        if (Enum.TryParse<OrderStatus>(status, true, out statusEnum))
            return statusEnum;
        return OrderStatus.Failed;
    }

}