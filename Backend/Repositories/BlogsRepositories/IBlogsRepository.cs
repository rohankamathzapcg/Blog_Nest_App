using Backend.Models;

namespace Backend.Repositories.BlogsRepositories
{
    public interface IBlogsRepository
    {
        public Task<Blogs> CreateBlogs(Blogs blogs);
        public Task<List<Blogs>> GetAllBlogs();
        public Task<Blogs?> GetBlogsById(Guid id);
        public Task<Blogs> UpdateBlogs(Guid id, Blogs blogs);
        public Task<Blogs?> DeleteBlogs(Guid id);
        public Task<Blogs?> GetBlogPostByURL(string url);
    }
}
