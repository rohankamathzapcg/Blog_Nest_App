using AutoMapper;
using Backend.Models;
using Backend.Models.DTOs;
using Backend.Repositories.BlogsRepositories;
using Microsoft.AspNetCore.Http;
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
        public async Task<IActionResult> CreateBlogs([FromBody] CreateBlogPostRequestDTO createBlogPostRequestDTO)
        {
            var blogDomain = mapper.Map<Blogs>(createBlogPostRequestDTO);
            blogDomain=await _blogsRepository.CreateBlogs(blogDomain);

            var blogDTO = mapper.Map<BlogsDTO>(blogDomain);
            return Ok(blogDTO);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBlogs()
        {
            var blogDomain=await _blogsRepository.GetAllBlogs();

            var blogDTO=mapper.Map<List<BlogsDTO>>(blogDomain);
            return Ok(blogDTO);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetBlogPostById([FromRoute] Guid id)
        {
            var blogDomain=await _blogsRepository.GetBlogsById(id);
            if(blogDomain == null)
            {
                return NotFound();
            }

            var blogDTO = mapper.Map<BlogsDTO>(blogDomain);
            return Ok(blogDTO);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateBlogs([FromRoute] Guid id, [FromBody] )
    }
}
