using CourseBookingApp.Api.src.Models.Entities;

namespace CourseBookingApp.Api.src.Data.Interfaces;

public interface IAuthRepository
{
  Task<User> AddUserAsync(User user);
  bool EmailExists(string email);
  Task<User?> GetUserByEmailAsync(string email);
  Task<User?> GetUserByIdAsync(int id);
  Task SaveChangesAsync();

}
