using CourseBookingApp.Api.src.Data.Interfaces;
using CourseBookingApp.Api.src.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace CourseBookingApp.Api.src.Data.Repositories;

public class AuthRepository(AppDbContext appDbContext) : IAuthRepository
{
  private readonly AppDbContext _appDbContext = appDbContext;

  public async Task<User> GetUserByEmailAsync(string email)
  {
    return await _appDbContext.Users.FirstOrDefaultAsync(s => s.Email == email);
  }

  public async Task<User> GetUserByIdAsync(int id)
  {
    return await _appDbContext.Users.FirstOrDefaultAsync(s => s.Id == id);
  }

  public async Task<User> AddUserAsync(User user)
  {
    await _appDbContext.Users.AddAsync(user);
    return user;
  }

  public async Task SaveChangesAsync()
  {
    await _appDbContext.SaveChangesAsync();
  }

  public bool EmailExists(string email)
  {
    return _appDbContext.Users.Any(e => e.Email == email);
  }
}
