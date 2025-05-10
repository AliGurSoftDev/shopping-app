using System.Collections;
using Microsoft.EntityFrameworkCore;

public class UserRepository : GenericRepository<User>, IUserRepository
{
    private new readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _context.Users
        .FirstOrDefaultAsync(u => u.Email == email);
    }
}