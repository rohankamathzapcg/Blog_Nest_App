using Backend.Database;
using Backend.Mappings;
using Backend.Repositories.CategoryRepositories;
using Microsoft.EntityFrameworkCore;

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

/*****************************************************************/

// Injecting Controller class
builder.Services.AddControllers();

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

app.MapControllers();

app.Run();
