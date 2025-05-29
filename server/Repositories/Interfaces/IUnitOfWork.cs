public interface IUnitOfWork : IDisposable
{
    IUserRepository Users { get; }
    IProductRepository Products { get; }
    IOrderRepository Orders { get; }
    ICategoryRepository Categories { get; }
    ICartRepository Carts { get; }
    IAddressRepository Addresses { get; }

    Task<int> SaveChangesAsync();
}