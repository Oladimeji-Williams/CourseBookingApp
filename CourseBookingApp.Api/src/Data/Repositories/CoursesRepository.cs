using CourseBookingApp.Api.src.Data.Interfaces;
using CourseBookingApp.Api.src.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace CourseBookingApp.Api.src.Data.Repositories;

public class CoursesRepository(AppDbContext appDbContext) : ICoursesRepository
{
  private readonly AppDbContext _appDbContext = appDbContext;

  public async Task<IEnumerable<Course>> GetCoursesAsync()
  {
    return await _appDbContext.Courses.AsNoTracking().ToListAsync();
  }

  public async Task<Course?> GetCourseByIdAsync(int id)
  {
    return await _appDbContext.Courses.FirstOrDefaultAsync(c => c.Id == id);
  }

  public async Task AddCourseAsync(Course course)
  {
    await _appDbContext.Courses.AddAsync(course);
  }

  public async Task UpdateCourseAsync(Course course)
  {
    _appDbContext.Courses.Update(course);
    await Task.CompletedTask;
  }

  public async Task DeleteCourseAsync(Course course)
  {
    _appDbContext.Courses.Remove(course);
    await Task.CompletedTask;
  }

  public async Task SaveChangesAsync()
  {
    await _appDbContext.SaveChangesAsync();
  }
}
