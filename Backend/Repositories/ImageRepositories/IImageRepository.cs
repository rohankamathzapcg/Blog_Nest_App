using Backend.Models;

namespace Backend.Repositories.ImageRepositories
{
    public interface IImageRepository
    {
        public Task<BlogImage> Upload(IFormFile file,BlogImage blogImage);
        public Task<List<BlogImage>> GetAllImages();
    }
}
