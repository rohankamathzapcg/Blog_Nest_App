using AutoMapper;
using Backend.Models;
using Backend.Models.DTOs;

namespace Backend.Mappings
{
    public class AutoMapperProfiles :Profile
    {
        public AutoMapperProfiles()
        {
            // For Category
            CreateMap<Category,CategoryDTO>().ReverseMap();
            CreateMap<CreateCategoryRequestDTO,Category>().ReverseMap();
        }
    }
}
