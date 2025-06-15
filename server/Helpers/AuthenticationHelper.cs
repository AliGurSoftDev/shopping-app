using System.Security.Claims;

namespace ShoppingProject.Helpers
{
    public static class AuthenticationHelper
    {
        public static int? GetUserId(this ClaimsPrincipal user)
        {
            var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return null;
            }

            return userId;
        }
    }
}
