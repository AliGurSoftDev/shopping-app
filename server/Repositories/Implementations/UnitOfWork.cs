public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;

    public IUserRepository Users { get; private set; }
    public IProductRepository Products { get; private set; }
    public IOrderRepository Orders { get; private set; }
    public ICategoryRepository Categories { get; private set; }
    public ICartRepository Carts { get; private set; }

    public UnitOfWork(ApplicationDbContext context,
                      IUserRepository users,
                      IProductRepository products,
                      IOrderRepository orders,
                      ICategoryRepository categories,
                      ICartRepository carts)
    {
        _context = context;
        Users = users;
        Products = products;
        Orders = orders;
        Categories = categories;
        Carts = carts;
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}