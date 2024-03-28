﻿namespace Backend.Models.DTOs
{
    public class BlogsDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Contents { get; set; }
        public string UrlHandle { get; set; }
        public string FeaturedImageUrl { get; set; }
        public Guid CategoryId { get; set; }
        public DateTime DateCreated { get; set; }
        public string Author { get; set; }
        public bool IsVisible { get; set; }

        // Navigation Properties
        public Category categories { get; set; }
    }
}
