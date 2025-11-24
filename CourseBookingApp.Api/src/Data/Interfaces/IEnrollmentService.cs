using CourseBookingApp.Api.src.Dtos;

namespace CourseBookingApp.Api.src.Data.Interfaces;

public interface IEnrollmentService
{
  Task<EnrollmentDto?> EnrollAsync(int userId, int courseId);
  Task<IEnumerable<EnrollmentDto>> GetUserEnrollmentsAsync(int userId);
  Task<bool> CancelEnrollmentAsync(int userId, int courseId);
}
