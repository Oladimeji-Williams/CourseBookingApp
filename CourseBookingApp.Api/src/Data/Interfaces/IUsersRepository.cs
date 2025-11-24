using CourseBookingApp.Api.src.Models.Entities;

namespace CourseBookingApp.Api.src.Data.Interfaces;

public interface IUsersRepository
{
  Task DeleteUserAsync(User user);
  Task<User?> GetUserByIdAsync(int userId);
  Task<IEnumerable<User>> GetUsersAsync();
  Task SaveChangesAsync();
  Task UpdateUserAsync(User user);
}
