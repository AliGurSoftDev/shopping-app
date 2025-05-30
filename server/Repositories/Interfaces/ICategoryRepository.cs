public interface ICategoryRepository : IGenericRepository<Category>
{
        Task<IEnumerable<Category>> GetFeaturedCategoriesAsync(int categoryCount = 4);

}