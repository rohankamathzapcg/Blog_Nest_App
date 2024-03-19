using Backend.Database;
using Backend.Models;

namespace Backend.Repositories.CategoryRepositories
{
    public class CategoryImplementation : ICategoryRepository
    {
        private readonly DBContext _dBContext;

        public CategoryImplementation(DBContext dBContext)
        {
            _dBContext = dBContext;
        }
        public async Task<Category> CreateNewCategory(Category category)
        {
            await _dBContext.Categories.AddAsync(category);
            await _dBContext.SaveChangesAsync();
            return category;
        }
    }
}
