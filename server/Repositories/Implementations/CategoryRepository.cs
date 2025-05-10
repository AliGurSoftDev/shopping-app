using Microsoft.EntityFrameworkCore;

public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
{
    private new readonly ApplicationDbContext _context;

    public CategoryRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }
}