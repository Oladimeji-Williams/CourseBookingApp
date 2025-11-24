using CourseBookingApp.Api.src.Data.Interfaces;
using CourseBookingApp.Api.src.Dtos;
using CourseBookingApp.Api.src.Mappers;

namespace CourseBookingApp.Api.src.Data.Services;

public class CoursesService(ICoursesRepository coursesRepository) : ICoursesService
{
  private readonly ICoursesRepository _coursesRepository = coursesRepository;

  public async Task<IEnumerable<CourseDto>> GetCoursesAsync()
      => (await _coursesRepository.GetCoursesAsync()).Select(CourseMapper.ToDto);

  public async Task<CourseDto?> GetCourseByIdAsync(int id)
  {
    var course = await _coursesRepository.GetCourseByIdAsync(id);
    return course == null ? null : CourseMapper.ToDto(course);
  }

  public async Task<CourseDto> CreateCourseAsync(CreateCourseDto createCourseDto)
  {
    var entity = CourseMapper.ToEntity(createCourseDto);
    await _coursesRepository.AddCourseAsync(entity);
    await _coursesRepository.SaveChangesAsync();
    return CourseMapper.ToDto(entity);
  }

  public async Task<CourseDto?> UpdateCourseAsync(int id, UpdateCourseDto updateCourseDto)
  {
    var course = await _coursesRepository.GetCourseByIdAsync(id);
    if (course == null) return null;

    CourseMapper.MapUpdate(course, updateCourseDto);
    await _coursesRepository.UpdateCourseAsync(course);
    await _coursesRepository.SaveChangesAsync();

    return CourseMapper.ToDto(course);
  }

  public async Task<bool> DeleteCourseAsync(int id)
  {
    var course = await _coursesRepository.GetCourseByIdAsync(id);
    if (course == null) return false;

    await _coursesRepository.DeleteCourseAsync(course);
    await _coursesRepository.SaveChangesAsync();
    return true;
  }
}
