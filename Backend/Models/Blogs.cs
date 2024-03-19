namespace Backend.Models
{
    public class Blogs
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Contents { get; set; }
        public string UrlHandle { get; set; }
        public string FeaturedImageUrl { get; set; }
        public DateTime DateCreated { get; set; }
        public string Author { get; set; }
        public bool IsVisible { get; set; }
    }
}
