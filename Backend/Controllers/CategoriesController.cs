using AutoMapper;
using Backend.Models;
using Backend.Models.DTOs;
using Backend.Repositories.CategoryRepositories;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categoryDomain = await _categoryRepository.GetAllCategories();

            var categoryDTO = mapper.Map<List<CategoryDTO>>(categoryDomain);
            return Ok(categoryDTO);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetCategoryById([FromRoute] Guid id)
        {
            var existingCategory=await _categoryRepository.GetCategoryById(id);
            if(existingCategory == null)
            {
                return NotFound();
            }

            var categoryDTO=mapper.Map<CategoryDTO>(existingCategory);
            return Ok(categoryDTO);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateCategory([FromRoute] Guid id, UpdateCategoryRequestDTO updateCategoryRequestDTO)
        {
            var categoryDomain = mapper.Map<Category>(updateCategoryRequestDTO);
            categoryDomain = await _categoryRepository.UpdateCategory(id, categoryDomain);
            if (categoryDomain == null)
            {
                return NotFound();
            }

            var categoryDTO=mapper.Map<CategoryDTO> (categoryDomain);
            return Ok(categoryDTO);
        }
    }
}
