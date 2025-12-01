namespace CourseBookingApp.Api.src.Mappers;

using CourseBookingApp.Api.src.Models.Entities;

public static class ImageMappers
{
  /// <summary>
  /// Maps uploaded image details to a User entity
  /// </summary>
  public static void MapUserImage(User user, string newUrl, string newPublicId)
  {
    user.ImgUrl = newUrl;
    user.ImgPublicId = newPublicId;
  }

  /// <summary>
  /// Maps uploaded image details to a Course entity
  /// </summary>
  public static void MapCourseImage(Course course, string newUrl, string newPublicId)
  {
    course.ImgUrl = newUrl;
    course.ImgPublicId = newPublicId;
  }
}
