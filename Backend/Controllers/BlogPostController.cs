using AutoMapper;
using Backend.Models;
using Backend.Models.DTOs;
using Backend.Repositories.BlogsRepositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostController : ControllerBase
    {
        private readonly IBlogsRepository _blogsRepository;
        private readonly IMapper mapper;

        public BlogPostController(IBlogsRepository blogsRepository, IMapper mapper)
        {
            _blogsRepository = blogsRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        [Authorize(Roles ="Writer")]
        public async Task<IActionResult> CreateBlogs([FromBody] CreateBlogPostRequestDTO createBlogPostRequestDTO)
        {
            var blogDomain = mapper.Map<Blogs>(createBlogPostRequestDTO);
            blogDomain = await _blogsRepository.CreateBlogs(blogDomain);

            var blogDTO = mapper.Map<BlogsDTO>(blogDomain);
            return Ok(blogDTO);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBlogs()
        {
            var blogDomain = await _blogsRepository.GetAllBlogs();

            var blogDTO = mapper.Map<List<BlogsDTO>>(blogDomain);
            return Ok(blogDTO);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetBlogPostById([FromRoute] Guid id)
        {
            var blogDomain = await _blogsRepository.GetBlogsById(id);
            if (blogDomain == null)
            {
                return NotFound();
            }

            var blogDTO = mapper.Map<BlogsDTO>(blogDomain);
            return Ok(blogDTO);
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> UpdateBlogs([FromRoute] Guid id, [FromBody] UpdateBlogPostRequestDTO updateBlogPostRequestDTO)
        {
            var blogDomain = mapper.Map<Blogs>(updateBlogPostRequestDTO);
            blogDomain = await _blogsRepository.UpdateBlogs(id, blogDomain);
            if (blogDomain == null)
            {
                return NotFound();
            }

            var blogDTO = mapper.Map<BlogsDTO>(blogDomain);
            return Ok(blogDTO);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> DeleteBlogPost([FromRoute] Guid id)
        {
            var deletedBlogPost = await _blogsRepository.DeleteBlogs(id);
            if (deletedBlogPost == null)
            {
                return NotFound();
            }

            var blogDTO = mapper.Map<BlogsDTO>(deletedBlogPost);
            return Ok(blogDTO);
        }

        [HttpGet]
        [Route("{urlHandle}")]
        public async Task<IActionResult> GetBlogPostByURL([FromRoute] string urlHandle)
        {
            var blogDomain= await _blogsRepository.GetBlogPostByURL(urlHandle);
            if(blogDomain == null)
            {
                return NotFound();
            }

            var blogDTO = mapper.Map<BlogsDTO>(blogDomain);
            return Ok(blogDTO);
        } 
    }
}
