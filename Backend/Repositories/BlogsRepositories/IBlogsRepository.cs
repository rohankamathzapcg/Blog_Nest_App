using Backend.Models;

namespace Backend.Repositories.BlogsRepositories
{
    public interface IBlogsRepository
    {
        public Task<Blogs> CreateBlogs(Blogs blogs);
        public Task<List<Blogs>> GetAllBlogs();
    }
}
