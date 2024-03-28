using Backend.Database;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories.BlogsRepositories
{
    public class BlogsImplementation : IBlogsRepository
    {
        private readonly DBContext _dBContext;

        public BlogsImplementation(DBContext dBContext)
        {
            _dBContext = dBContext;
        }
        public async Task<Blogs> CreateBlogs(Blogs blogs)
        {
            await _dBContext.BlogPost.AddAsync(blogs);
            await _dBContext.SaveChangesAsync();
            return blogs;
        }

        public async Task<List<Blogs>> GetAllBlogs()
        {
            return await _dBContext.BlogPost.ToListAsync();
        }
    }
}
