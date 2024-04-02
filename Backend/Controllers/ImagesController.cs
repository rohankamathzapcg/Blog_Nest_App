using AutoMapper;
using Backend.Models;
using Backend.Models.DTOs;
using Backend.Repositories.ImageRepositories;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IImageRepository _imageRepository;

        public ImagesController(IMapper mapper,IImageRepository imageRepository)
        {
            this.mapper = mapper;
            _imageRepository = imageRepository;
        }


        [HttpPost]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file,[FromForm] string filename,[FromForm] string title)
        {
            ValidateFileUpload(file);
            if(ModelState.IsValid)
            {
                var BlogImage = new BlogImage
                {
                    FileExtension = Path.GetExtension(file.FileName).ToLower(),
                    FileName = filename,
                    Title = title,
                    DateCreated = DateTime.UtcNow,
                };

                var blogImageDomain=await _imageRepository.Upload(file, BlogImage);
                
                var blogImageDTO=mapper.Map<BlogImageDTO>(blogImageDomain);

                return Ok(blogImageDTO);
            }
            return BadRequest(ModelState);
        }

        private void ValidateFileUpload(IFormFile file)
        {
            var allowedExtensions = new string[] { "jpg", "jpeg", "png" };
            if (allowedExtensions.Contains(Path.GetExtension(file.FileName).ToLower()))
            {
                ModelState.AddModelError("file", "Unsupported file format");
            }
            if(file.Length>1048568)
            {
                ModelState.AddModelError("file", "File size cannot be more than 10MB");
            }
        }
    }
}
