using Microsoft.EntityFrameworkCore;

public class ProductRepository : GenericRepository<Product>, IProductRepository
{
    private new readonly ApplicationDbContext _context;

    public ProductRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public override async Task<Product?> GetByIdAsync(int id)
    {
        return await _context.Products
                .Include(p => p.ImageUrls).
                FirstOrDefaultAsync(p => p.Id == id);
    }
    
    public override async Task<IEnumerable<Product>> GetAllAsync()
    {
        return await _context.Products
                .Include(p => p.ImageUrls)
                .ToListAsync();
    }

    public async Task<IEnumerable<Product>> GetByCategoryAsync(int categoryId)
    {
        return await _context.Products
            .Where(p => p.CategoryId == categoryId)
            .Include(p => p.ImageUrls)
            .OrderBy(p => p.Id)
            .ToListAsync();
    }

    public async Task<IEnumerable<Product>> GetFeaturedProductsAsync()
    {
        return await _context.Products
            .Where(p => p.IsFeatured == 1)
            .Include(p => p.ImageUrls)
            .OrderBy(p => p.Id)
            .ToListAsync();
    }
}