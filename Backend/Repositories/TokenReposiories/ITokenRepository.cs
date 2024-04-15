using Microsoft.AspNetCore.Identity;

namespace Backend.Repositories.TokenReposiories
{
    public interface ITokenRepository
    {
        string CreateJwtToken(IdentityUser identityUser, List<string> roles);
    }
}
