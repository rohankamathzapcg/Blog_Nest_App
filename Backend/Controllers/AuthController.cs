using Backend.Models.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;

        public AuthController(UserManager<IdentityUser> userManager)
        {
            this.userManager = userManager;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO registerRequestDTO)
        {
            // Create IdentityUser Object
            var user = new IdentityUser
            {
                UserName = registerRequestDTO.Email?.Trim(),
                Email = registerRequestDTO.Email?.Trim(),
            };

            var identityResult = await userManager.CreateAsync(user, registerRequestDTO.Password);

            if (identityResult.Succeeded)
            {
                identityResult = await userManager.AddToRoleAsync(user, "Reader");
                if (identityResult.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    if (identityResult.Errors.Any())
                    {
                        foreach (var error in identityResult.Errors)
                        {
                            ModelState.AddModelError("", error.Description);
                        }
                    }
                }
            }
            else
            {
                if(identityResult.Errors.Any())
                {
                    foreach (var error in identityResult.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
            }

            return ValidationProblem(ModelState);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO loginRequestDTO)
        {
            // Check Email present or not
            var identityUser = await userManager.FindByEmailAsync(loginRequestDTO.Email);

            if(identityUser is not null)
            {
                // Check password is valid
                var checkPasswordResult=await userManager.CheckPasswordAsync(identityUser, loginRequestDTO.Password);
                if(checkPasswordResult)
                {
                    var roles=await userManager.GetRolesAsync(identityUser);

                    // Create a Token and Response
                    var response = new LoginResponseDTO()
                    {
                        Email = loginRequestDTO.Email,
                        Roles = roles.ToList(),
                        Token = "TOKEN"
                    };
                    return Ok(response);
                }
            }
            ModelState.AddModelError("", "Email or Password Incorrect");
            return ValidationProblem(ModelState);
        }
    }
}
