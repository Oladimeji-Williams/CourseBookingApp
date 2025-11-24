using CourseBookingApp.Api.src.Models.Entities;

namespace CourseBookingApp.Api.src.Data.Interfaces;

public interface IEnrollmentRepository
{
  Task<Enrollment?> GetEnrollmentAsync(int userId, int courseId);
  Task<IEnumerable<Enrollment>> GetUserEnrollmentsAsync(int userId);
  Task AddEnrollmentAsync(Enrollment enrollment);
  Task SaveChangesAsync();
}
