using CourseBookingApp.Api.src.Dtos;

namespace CourseBookingApp.Api.src.Data.Interfaces;

public interface IUsersService
{
  Task<string> ChangePasswordAsync(int userId, ChangePasswordDto changePasswordDto);
  Task<UserDto> ChangeRoleAsync(int id, ChangeRoleDto changeRoleDto, int currentUserId);
  Task<bool> DeleteUserAsync(int id, int currentUserId);
  Task<UserDto> GetUserByIdAsync(int id);
  Task<IEnumerable<UserDto>> GetUsersAsync();
  Task<UserDto> UpdateUserAsync(int id, UpdateUserDto updateUserDto, int currentUserId);

}
