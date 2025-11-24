using CourseBookingApp.Api.src.Data.Interfaces;
using CourseBookingApp.Api.src.Dtos;
using CourseBookingApp.Api.src.Mappers;
using CourseBookingApp.Api.src.Models.Entities;
using CourseBookingApp.Api.src.Models.Enums;
using Microsoft.AspNetCore.Identity;

namespace CourseBookingApp.Api.src.Data.Services;

public class AuthService
(
  IAuthRepository authRepository,
  PasswordHasher<User> passwordHasher,
  ITokenService tokenService
) : IAuthService
{
  private readonly IAuthRepository _authRepository = authRepository;
  private readonly PasswordHasher<User> _passwordHasher = passwordHasher;
  private readonly ITokenService _tokenService = tokenService;


  public async Task<AuthResponseDto?> LoginAsync(LoginDto loginDto)
  {
    var user = await _authRepository.GetUserByEmailAsync(loginDto.Email);
    if (user == null)
      return null;

    var verifyPassword = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, loginDto.Password);
    if (verifyPassword == PasswordVerificationResult.Failed)
      return null;

    var token = _tokenService.GetToken(user);
    return user.ToAuthResponse(token);
  }

  public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
  {
    var existingUser = await _authRepository.GetUserByEmailAsync(registerDto.Email);
    if (existingUser != null)
    {
      throw new InvalidOperationException("Email already registered.");
    }

    var passwordHash = _passwordHasher.HashPassword(null!, registerDto.Password);
    var user = registerDto.ToEntity(passwordHash);
    await _authRepository.AddUserAsync(user);
    await _authRepository.SaveChangesAsync();

    // Generate and return token
    var token = _tokenService.GetToken(user);
    return user.ToAuthResponse(token);

  }
}
