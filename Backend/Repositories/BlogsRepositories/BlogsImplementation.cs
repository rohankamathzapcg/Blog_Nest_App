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

        public async Task<Blogs?> DeleteBlogs(Guid id)
        {
            var existingBlog = await _dBContext.BlogPost.FirstOrDefaultAsync(x => x.Id == id);
            if (existingBlog != null)
            {
                _dBContext.BlogPost.Remove(existingBlog);
                await _dBContext.SaveChangesAsync();
                return existingBlog;
            }
            return null;
        }

        public async Task<List<Blogs>> GetAllBlogs()
        {
            return await _dBContext.BlogPost.Include("categories").ToListAsync();
        }

        public async Task<Blogs?> GetBlogPostByURL(string url)
        {
            return await _dBContext.BlogPost.Include("categories").FirstOrDefaultAsync(x => x.UrlHandle == url);
        }

        public async Task<Blogs?> GetBlogsById(Guid id)
        {
            return await _dBContext.BlogPost.Include("categories").FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Blogs?> UpdateBlogs(Guid id, Blogs blogs)
        {
            var existingBlog = await _dBContext.BlogPost.FirstOrDefaultAsync(x => x.Id == id);
            if (existingBlog == null)
            {
                return null;
            }
            existingBlog.Title = blogs.Title;
            existingBlog.Description = blogs.Description;
            existingBlog.Contents = blogs.Contents;
            existingBlog.UrlHandle = blogs.UrlHandle;
            existingBlog.FeaturedImageUrl = blogs.FeaturedImageUrl;
            existingBlog.CategoryId = blogs.CategoryId;
            existingBlog.DateCreated = blogs.DateCreated;
            existingBlog.Author = blogs.Author;
            existingBlog.IsVisible = blogs.IsVisible;
            await _dBContext.SaveChangesAsync();
            return existingBlog;
        }
    }
}
