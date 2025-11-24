using CourseBookingApp.Api.src.Data.Interfaces;
using CourseBookingApp.Api.src.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace CourseBookingApp.Api.src.Data.Repositories;

public class UsersRepository(AppDbContext appDbContext) : IUsersRepository
{
  private readonly AppDbContext _appDbContext = appDbContext;
  public async Task DeleteUserAsync(User user)
  {
    _appDbContext.Users.Remove(user);
    await Task.CompletedTask;
  }

  public async Task<User?> GetUserByIdAsync(int userId)
  {
    return await _appDbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
  }

  public async Task<IEnumerable<User>> GetUsersAsync()
  {
    return await _appDbContext.Users.AsNoTracking().ToListAsync();
  }

  public async Task SaveChangesAsync()
  {
    await _appDbContext.SaveChangesAsync();
  }

  public async Task UpdateUserAsync(User user)
  {
    _appDbContext.Users.Update(user);
    await _appDbContext.SaveChangesAsync();
  }
}
