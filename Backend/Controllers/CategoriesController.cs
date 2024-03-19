using AutoMapper;
using Backend.Models;
using Backend.Models.DTOs;
using Backend.Repositories.CategoryRepositories;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper mapper;

        public CategoriesController(ICategoryRepository categoryRepository, IMapper _mapper)
        {
            _categoryRepository = categoryRepository;
            mapper = _mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequestDTO createCategoryRequestDTO)
        {
            var categoryDomain = mapper.Map<Category>(createCategoryRequestDTO);
            categoryDomain = await _categoryRepository.CreateNewCategory(categoryDomain);

            var categoryDTO = mapper.Map<CategoryDTO>(categoryDomain);
            return Ok(categoryDTO);

        }
    }
}
