using CourseBookingApp.Api.src.Data.Interfaces;
using CourseBookingApp.Api.src.Dtos;
using CourseBookingApp.Api.src.Mappers;
using CourseBookingApp.Api.src.Models.Entities;

namespace CourseBookingApp.Api.src.Data.Services;

public class EnrollmentService(
    IEnrollmentRepository enrollmentRepository,
    ICoursesRepository coursesRepository
) : IEnrollmentService
{
  private readonly IEnrollmentRepository _enrollmentRepository = enrollmentRepository;
  private readonly ICoursesRepository _coursesRepository = coursesRepository;

  public async Task<EnrollmentDto?> EnrollAsync(int userId, int courseId)
  {
    var course = await _coursesRepository.GetCourseByIdAsync(courseId);
    if (course == null) return null;

    var existing = await _enrollmentRepository.GetEnrollmentAsync(userId, courseId);
    if (existing != null && existing.IsActive)
      throw new InvalidOperationException("Already enrolled");

    var enrollment = new Enrollment
    {
      UserId = userId,
      CourseId = courseId,
      IsActive = true
    };

    await _enrollmentRepository.AddEnrollmentAsync(enrollment);
    await _enrollmentRepository.SaveChangesAsync();

    return EnrollmentMapper.ToDto(enrollment);
  }

  public async Task<IEnumerable<EnrollmentDto>> GetUserEnrollmentsAsync(int userId)
  {
    var enrollments = await _enrollmentRepository.GetUserEnrollmentsAsync(userId);
    return enrollments.Select(EnrollmentMapper.ToDto);
  }

  public async Task<bool> CancelEnrollmentAsync(int userId, int courseId)
  {
    var enrollment = await _enrollmentRepository.GetEnrollmentAsync(userId, courseId);
    if (enrollment == null) return false;

    enrollment.IsActive = false;
    await _enrollmentRepository.SaveChangesAsync();
    return true;
  }
}
