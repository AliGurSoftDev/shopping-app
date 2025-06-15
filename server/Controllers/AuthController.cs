using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly JwtHelper _jwtService;
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public AuthController(IUnitOfWork unitOfWork, IMapper mapper, JwtHelper jwtService, IPasswordHasher<User> passwordHasher)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _jwtService = jwtService;
        _passwordHasher = passwordHasher;
    }

    //Checks user e-mail and password for login. Return authentication token.
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDto userLoginDto)
    {
        var user = await _unitOfWork.Users.GetByEmailAsync(userLoginDto.Email);

        if (user == null)
            return Unauthorized("Invalid email.");

        var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, userLoginDto.Password);
        if (result == PasswordVerificationResult.Failed)
            return Unauthorized("Invalid password.");

        var token = _jwtService.GenerateToken(user);

        var userDto = _mapper.Map<UserDto>(user);

        return Ok(new { token, user = userDto });
    }

    //Creates a new user.
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserCreateDto userCreateDto)
    {
        if (string.IsNullOrWhiteSpace(userCreateDto.FirstName) ||
            string.IsNullOrWhiteSpace(userCreateDto.LastName) ||
            string.IsNullOrWhiteSpace(userCreateDto.Email) ||
            string.IsNullOrWhiteSpace(userCreateDto.Password))
        {
            return BadRequest(new { message = "All fields are required." });
        }

        var mailCheck = await _unitOfWork.Users.GetByEmailAsync(userCreateDto.Email);
        if (mailCheck != null)
        {
            return Conflict(new { message = "This email is already in use." });
        }

        var user = _mapper.Map<User>(userCreateDto);
        user.PasswordHash = _passwordHasher.HashPassword(user, userCreateDto.Password);

        await _unitOfWork.Users.AddAsync(user);
        await _unitOfWork.SaveChangesAsync();

        var newUserDto = _mapper.Map<UserDto>(user);

        return Ok(newUserDto);
    }

    //Updates user info. Requires token authentication.
    [Authorize]
    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UserUpdateDto userUpdateDto)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdClaim, out int userId))
        {
            return Unauthorized(new { message = "Invalid or missing user identifier in token." });
        }

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var existingUser = await _unitOfWork.Users.GetByIdAsync(userId);
        if (existingUser == null)
            return NotFound();

        _mapper.Map(userUpdateDto, existingUser);

        if (!string.IsNullOrWhiteSpace(userUpdateDto.Password))
            existingUser.PasswordHash = _passwordHasher.HashPassword(existingUser, userUpdateDto.Password);

        _unitOfWork.Users.Update(existingUser);
        await _unitOfWork.SaveChangesAsync();

        var updatedUserDto = _mapper.Map<UserDto>(existingUser);

        return Ok(updatedUserDto);
    }

    //Return user information via header token.
    [Authorize]
    [HttpGet("getUser")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdClaim, out int userId))
        {
            return Unauthorized(new { message = "Invalid or missing user identifier in token." });
        }

        var user = await _unitOfWork.Users.GetByIdAsync(userId);
        if (user == null)
        {
            return NotFound(new { message = "User not found." });
        }

        var userDto = _mapper.Map<UserDto>(user);

        return Ok(userDto);
    }

    //Resets password to "password". Created for development convenience, not viable in production.
    [HttpPost("resetPassword/{email}")]
    public async Task<IActionResult> ResetPassword(string email)
    {
        var user = await _unitOfWork.Users.GetByEmailAsync(email);

        if (user == null) return NotFound("User not found.");

        user.PasswordHash = _passwordHasher.HashPassword(user, "password");

        _unitOfWork.Users.Update(user);
        await _unitOfWork.SaveChangesAsync();

        return Ok("Password reset operation is completed successfully.");
    }
}
