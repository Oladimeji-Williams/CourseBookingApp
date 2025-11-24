namespace CourseBookingApp.Api.src.Dtos;

public class AuthResponseDto()
{
  public required string Token { get; set; }
  public UserDto? User { get; set; }
}
public class ChangePasswordDto
{
  public required string CurrentPassword { get; set; }
  public required string NewPassword { get; set; }
}
public class LoginDto
{
  public required string Email { get; set; }
  public required string Password { get; set; }
}
public class RegisterDto
{
  public required string Email { get; set; }
  public required string Password { get; set; }
}
