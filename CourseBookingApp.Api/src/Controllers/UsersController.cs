using System.Security.Claims;
using CourseBookingApp.Api.src.Data.Interfaces;
using CourseBookingApp.Api.src.Dtos;
using CourseBookingApp.Api.src.Mappers;
using CourseBookingApp.Api.src.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace CourseBookingApp.Api.src.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController(
    IUsersService usersService,
    IImageService imageService,
    IUsersRepository usersRepository
) : ControllerBase
{
    private readonly IUsersService _usersService = usersService;
    private readonly IImageService _imageService = imageService;
    private readonly IUsersRepository _usersRepository = usersRepository;


    [Authorize]
    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto changePasswordDto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var result = await _usersService.ChangePasswordAsync(currentUserId, changePasswordDto);
        return Ok(new { message = result });
    }
    
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetUsersAsync()
    {
        var users = await _usersService.GetUsersAsync();
        return Ok(users);
    }

    [HttpGet("{userId:int}")]
    public async Task<IActionResult> GetUserByIdAsync(int userId)
    {
        var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var user = await _usersService.GetUserByIdAsync(userId);
        if (user == null)
        {
            return NotFound();
        }
        var role = User.FindFirst(ClaimTypes.Role)?.Value;
        if (role != "Admin" && currentUserId != userId)
        {
            return Forbid();
        }
        return Ok(user);
    }

    [HttpPut("{userId:int}")]
    public async Task<IActionResult> UpdateUserAsync(int userId, [FromBody] UpdateUserDto updateUserDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        try
        {
            var updated = await _usersService.UpdateUserAsync(userId, updateUserDto, currentUserId);
            if (updated == null)
            {
                return NotFound();
            }
            return Ok(updated);
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
    }

    [HttpPut("{id:int}/role")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ChangeRoleAsync(int id, [FromBody] ChangeRoleDto changeRoleDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var changed = await _usersService.ChangeRoleAsync(id, changeRoleDto, currentUserId);
        if (changed == null)
        {
            return NotFound();
        }
        return Ok(changed);
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteUserAsync(int id)
    {
        var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        try
        {
            var ok = await _usersService.DeleteUserAsync(id, currentUserId);
            if (!ok)
            {
                return NotFound();
            }
            return NoContent();
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
    }
    [HttpPost("{userId:int}/upload-image")]
    public async Task<IActionResult> UploadUserImage(int userId, IFormFile formFile)
    {
        if (formFile == null || formFile.Length == 0)
            return BadRequest("No image provided");

        var user = await _usersRepository.GetUserByIdAsync(userId);
        if (user == null)
            return NotFound("User not found");

        var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var currentRole = User.FindFirst(ClaimTypes.Role)?.Value;

        if (currentRole != UserType.Admin.ToString() && currentUserId != userId)
            return Forbid();
        // Old version using email
        // var safeEmail = user.Email.Replace("@", "_").Replace(".", "_");
        // var fileName = $"{user.Id}_{safeEmail}";

        // New version using id_firstname_lastname
        var safeFirstName = string.IsNullOrWhiteSpace(user.FirstName) ? "unknown" : user.FirstName.Trim().Replace(" ", "_");
        var safeLastName = string.IsNullOrWhiteSpace(user.LastName) ? "unknown" : user.LastName.Trim().Replace(" ", "_");
        var fileName = $"{user.Id}_{safeFirstName}_{safeLastName}";

        await _imageService.UpdateEntityImageAsync(user, formFile, "user_images", fileName);

        await _usersRepository.SaveChangesAsync();

        return Ok(new { imageUrl = user.ImgUrl });
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> GetCurrentUserAsync()
    {
        var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var user = await _usersService.GetUserByIdAsync(currentUserId);
        if (user == null)
            return NotFound();

        return Ok(user);
    }
}