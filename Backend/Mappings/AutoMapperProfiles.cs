using AutoMapper;
using Backend.Models;
using Backend.Models.DTOs;

namespace Backend.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // For Category
            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<CreateCategoryRequestDTO, Category>().ReverseMap();
            CreateMap<UpdateCategoryRequestDTO, Category>().ReverseMap();

            // For Blogs
            CreateMap<Blogs, BlogsDTO>().ReverseMap();
            CreateMap<CreateBlogPostRequestDTO, Blogs>().ReverseMap();
            CreateMap<UpdateBlogPostRequestDTO, Blogs>().ReverseMap();

            // For Blog Images
            CreateMap<BlogImage, BlogImageDTO>().ReverseMap();
        }
    }
}
