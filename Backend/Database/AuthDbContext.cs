using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend.Database
{
    public class AuthDbContext :IdentityDbContext
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var readerRoleId = "c6174b91-23d9-40cb-b15f-01e03bf1e87b";
            var writerRoleId = "c36679db-99d8-4ed6-80a6-037ebd62063a";

            // Create Reader and Writer role
            var roles = new List<IdentityRole>
            {
                new IdentityRole()
                {
                    Id=readerRoleId,
                    Name="Reader",
                    NormalizedName="Reader".ToUpper(),
                    ConcurrencyStamp=readerRoleId
                },
                new IdentityRole()
                {
                    Id=writerRoleId,
                    Name="Writer",
                    NormalizedName="Writer".ToUpper(),
                    ConcurrencyStamp=writerRoleId
                }
            };

            // Seed the Role
            builder.Entity<IdentityRole>().HasData(roles);

            // Create an Admin User
            var adminUserId = "48b15c43-2aab-466b-911a-ca63e3e495ac";
            var admin = new IdentityUser()
            {
                Id = adminUserId,
                UserName = "admin_user",
                Email = "admin@gmail.com",
                NormalizedEmail = "admin@gmail.com".ToUpper(),
                NormalizedUserName = "admin_user".ToUpper()
            };

            admin.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(admin, "Admin@123");

            builder.Entity<IdentityUser>().HasData(admin);

            // Give Roles to Admin
            var adminRoles = new List<IdentityUserRole<string>>()
            {
                new ()
                {
                    UserId = adminUserId,
                    RoleId=readerRoleId
                },
                new ()
                {
                    UserId=adminUserId,
                    RoleId=writerRoleId
                }
            };
        }
    }
}
