using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class AddressRepository : GenericRepository<Address>, IAddressRepository
{
    private new readonly ApplicationDbContext _context;

    public AddressRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Address?>> GetAddressesByUserIdAsync(int userId)
    {
        return await _context.Addresses
            .Where(a => a.UserId == userId)
            .OrderBy(a => a.Id)
            .ToListAsync();
    }

    public async Task<Address?> GetDefaultAddressByUserIdAsync(int userId)
    {
        return await _context.Addresses
            .Where(a => a.UserId == userId)
            .FirstOrDefaultAsync(a => a.IsDefault == 1);
    }

    public async Task<IEnumerable<Country>> GetCountriesAsync()
    {
        return await _context.Countries
            .OrderBy(c => c.CountryName)
            .ToListAsync();
    }

    public async Task<IEnumerable<City?>> GetCitiesByCountryIdAsync()
    {
        return await _context.Cities
            .OrderBy(c => c.CityName)
            .ToListAsync();
    }
}