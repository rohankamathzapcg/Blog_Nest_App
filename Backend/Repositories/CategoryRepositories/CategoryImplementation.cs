using Backend.Database;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

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

        public async Task<List<Category>> GetAllCategories()
        {
            return await _dBContext.Categories.ToListAsync();
        }

        public async Task<Category?> GetCategoryById(Guid id)
        {
            return await _dBContext.Categories.FirstOrDefaultAsync(x=>x.Id == id);
        }
    }
}
