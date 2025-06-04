public interface IAddressRepository : IGenericRepository<Address>
{
    Task<IEnumerable<Address?>> GetAddressesByUserIdAsync(int userId);
    Task<Address?> GetDefaultAddressByUserIdAsync(int userId);
    Task<IEnumerable<Country>> GetCountriesAsync();
    Task<IEnumerable<City?>> GetCitiesByCountryIdAsync();
}