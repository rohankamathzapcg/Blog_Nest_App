using Backend.Models;

namespace Backend.Repositories.CategoryRepositories
{
    public interface ICategoryRepository
    {
        public Task<Category> CreateNewCategory(Category category);
    }
}
