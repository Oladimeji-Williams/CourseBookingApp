using CourseBookingApp.Api.src.Dtos;

namespace CourseBookingApp.Api.src.Data.Interfaces;

public interface ICoursesService
{
  Task<IEnumerable<CourseDto>> GetCoursesAsync();
  Task<CourseDto?> GetCourseByIdAsync(int id);
  Task<CourseDto> CreateCourseAsync(CreateCourseDto createCourseDto);
  Task<CourseDto?> UpdateCourseAsync(int id, UpdateCourseDto updateCourseDto);
  Task<bool> DeleteCourseAsync(int id);
}
