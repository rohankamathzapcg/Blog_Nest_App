using Backend.Database;
using Backend.Mappings;
using Backend.Repositories.BlogsRepositories;
using Backend.Repositories.CategoryRepositories;
using Backend.Repositories.ImageRepositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
/*****************************************************************/

// Injecting Dbcontext class
builder.Services.AddDbContext<DBContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("WebApiPostgresDatabase")));

// Injecting Automapper class
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));

//Injectng Category Repository class wih Interface
builder.Services.AddScoped<ICategoryRepository,CategoryImplementation>();

//Injectng Blogs Repository class wih Interface
builder.Services.AddScoped<IBlogsRepository, BlogsImplementation>();

//Injectng Image Repository class wih Interface
builder.Services.AddScoped<IImageRepository, ImageImplementation>();

/*****************************************************************/

// Injecting Controller class
builder.Services.AddControllers();
builder.Services.AddHttpContextAccessor();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Adding CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("corspolicy", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Using CORS Policy
app.UseCors("corspolicy");

app.UseAuthorization();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider=new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(),"Images")),
    RequestPath="/Images"
});

app.MapControllers();

app.Run();
