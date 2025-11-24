using CourseBookingApp.Api.src.Dtos;

namespace CourseBookingApp.Api.src.Data.Interfaces;

public interface IAuthService
{
  Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
  Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
}
