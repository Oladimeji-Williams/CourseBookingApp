using CourseBookingApp.Api.src.Dtos;
using CourseBookingApp.Api.src.Models.Entities;
using CourseBookingApp.Api.src.Models.Enums;

namespace CourseBookingApp.Api.src.Mappers;

public static class CourseMapper
{
  public static CourseDto ToDto(Course course)
  {
    return new CourseDto
    {
      Id = course.Id,
      Title = course.Title,
      Description = course.Description,
      Price = course.Price,
      Type = course.Type.ToString(),
      Created = course.Created
    };
  }

  public static Course ToEntity(CreateCourseDto createCourseDto)
  {
    return new Course
    {
      Title = createCourseDto.Title,
      Description = createCourseDto.Description,
      Price = createCourseDto.Price,
      Type = Enum.Parse<CourseType>(createCourseDto.Type, true)
    };
  }

  public static void MapUpdate(Course course, UpdateCourseDto updateCourseDto)
  {
    course.Title = updateCourseDto.Title ?? course.Title;
    course.Description = updateCourseDto.Description ?? course.Description;
    course.Price = updateCourseDto.Price ?? course.Price;
    course.Modified = DateTime.Now;
  }
}
