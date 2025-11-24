using CourseBookingApp.Api.src.Models.Entities;

namespace CourseBookingApp.Api.src.Data.Interfaces;

public interface ICoursesRepository
{
  Task<IEnumerable<Course>> GetCoursesAsync();
  Task<Course?> GetCourseByIdAsync(int id);
  Task AddCourseAsync(Course course);
  Task UpdateCourseAsync(Course course);
  Task DeleteCourseAsync(Course course);
  Task SaveChangesAsync();
}
