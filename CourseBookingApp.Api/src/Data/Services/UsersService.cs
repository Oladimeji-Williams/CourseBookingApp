using CourseBookingApp.Api.src.Data.Interfaces;
using CourseBookingApp.Api.src.Data.Repositories;
using CourseBookingApp.Api.src.Dtos;
using CourseBookingApp.Api.src.Mappers;
using CourseBookingApp.Api.src.Models.Entities;
using CourseBookingApp.Api.src.Models.Enums;
using Microsoft.AspNetCore.Identity;

namespace CourseBookingApp.Api.src.Data.Services;

public class UsersService(
  IAuthRepository authRepository,
  IUsersRepository usersRepository,
  PasswordHasher<User> passwordHasher
  ) : IUsersService {
  private readonly IAuthRepository _authRepository = authRepository;
  private readonly PasswordHasher<User> _passwordHasher = passwordHasher;
  private readonly IUsersRepository _usersRepository = usersRepository;

  public async Task<string> ChangePasswordAsync(int userId, ChangePasswordDto changePasswordDto)
  {
    // Fetch user
    var user = await _authRepository.GetUserByIdAsync(userId);
    if (user == null)
    {
      return "User not found!";
    }

    // Verify old password
    var veryResult = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, changePasswordDto.CurrentPassword);
    if (veryResult == PasswordVerificationResult.Failed)
    {
      return "Old password is incorrect!";
    }

    // Hash and set new password
    user.PasswordHash = _passwordHasher.HashPassword(user, changePasswordDto.NewPassword);

    // Save changes
    await _authRepository.SaveChangesAsync();

    return "Password changed successfully";

  }
  public async Task<UserDto> ChangeRoleAsync(int id, ChangeRoleDto changeRoleDto, int currentUserId)
  {
    var currentUser = await _usersRepository.GetUserByIdAsync(currentUserId);

    if (currentUser == null || currentUser.Type != UserType.Admin)
      throw new UnauthorizedAccessException("Only admins can change user roles.");

    var user = await _usersRepository.GetUserByIdAsync(id);
    if (user == null)
      return null;

    UserMapper.MapRole(user, changeRoleDto.Type);

    await _usersRepository.UpdateUserAsync(user);
    await _usersRepository.SaveChangesAsync();

    return UserMapper.ToDto(user);
  }

  public async Task<bool> DeleteUserAsync(int id, int currentUserId)
  {
    var currentUser = await _usersRepository.GetUserByIdAsync(currentUserId);

    if (currentUser == null || currentUser.Type != UserType.Admin)
      throw new UnauthorizedAccessException("Only admins can delete users.");

    var user = await _usersRepository.GetUserByIdAsync(id);
    if (user == null)
      return false;

    await _usersRepository.DeleteUserAsync(user);
    await _usersRepository.SaveChangesAsync();

    return true;
  }

  public async Task<UserDto> GetUserByIdAsync(int id)
  {
    var user = await _usersRepository.GetUserByIdAsync(id);
    return user == null ? null : UserMapper.ToDto(user);
  }

  public async Task<IEnumerable<UserDto>> GetUsersAsync()
  {
    var users = await _usersRepository.GetUsersAsync();
    return users.Select(UserMapper.ToDto);
  }


  public async Task<UserDto> UpdateUserAsync(int id, UpdateUserDto updateUserDto, int currentUserId)
  {
    var user = await _usersRepository.GetUserByIdAsync(id);
    if (user == null)
      return null;

    if (currentUserId != id)
      throw new UnauthorizedAccessException("You can only update your own profile.");

    UserMapper.MapUpdate(user, updateUserDto);

    await _usersRepository.UpdateUserAsync(user);
    await _usersRepository.SaveChangesAsync();

    return UserMapper.ToDto(user);
  }
}
