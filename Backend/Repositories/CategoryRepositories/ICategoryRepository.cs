using Backend.Models;

namespace Backend.Repositories.CategoryRepositories
{
    public interface ICategoryRepository
    {
        public Task<Category> CreateNewCategory(Category category);
        public Task<List<Category>> GetAllCategories();
        public Task<Category?> GetCategoryById(Guid id);
        public Task<Category?> UpdateCategory(Guid id, Category category);
    }
}
