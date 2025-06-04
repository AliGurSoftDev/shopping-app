using System.IO.Compression;
using Microsoft.EntityFrameworkCore;

public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
{
    private new readonly ApplicationDbContext _context;

    public CategoryRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Category>> GetFeaturedCategoriesAsync(int categoryCount = 4)
    {
        return await _context.Categories
        .Where(c => c.IsFeatured == 1)
        .Take(categoryCount)
        .OrderBy(c => c.Id)
        .ToListAsync();
    }

}