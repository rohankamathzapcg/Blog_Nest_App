
using Backend.Database;
using Backend.Models;

namespace Backend.Repositories.ImageRepositories
{
    public class ImageImplementation : IImageRepository
    {
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly DBContext dBContext;

        public ImageImplementation(IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor,DBContext dBContext)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.httpContextAccessor = httpContextAccessor;
            this.dBContext = dBContext;
        }

        public async Task<BlogImage> Upload(IFormFile file, BlogImage blogImage)
        {
            // 1-Upload the Images to api/Images

            var localPath = Path.Combine(webHostEnvironment.ContentRootPath, "Images", $"{blogImage.FileName}{blogImage.FileExtension}");
            using var stream = new FileStream(localPath, FileMode.Create);
            await file.CopyToAsync(stream);

            // 2-Update the Database
            var httpRequest = httpContextAccessor.HttpContext.Request;
            var urlPath = $"{httpRequest.Scheme}://{httpRequest.Host}{httpRequest.PathBase}/Images/{blogImage.FileName}{blogImage.FileExtension}";

            blogImage.Url = urlPath;

            await dBContext.BlogImages.AddAsync(blogImage);
            await dBContext.SaveChangesAsync();
            return blogImage;
        }
    }
}
