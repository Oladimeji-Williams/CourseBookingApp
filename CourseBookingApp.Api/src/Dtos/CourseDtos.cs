namespace CourseBookingApp.Api.src.Dtos;

public class CourseDto
{
  public int Id { get; set; }
  public string? Title { get; set; }
  public string? Description { get; set; }
  public double? Price { get; set; }
  public string Type { get; set; }
}

public class CreateCourseDto
{
  public string? Title { get; set; }
  public string? Description { get; set; }
  public double? Price { get; set; }
  public string Type { get; set; }
}

public class UpdateCourseDto
{
  public string? Title { get; set; }
  public string? Description { get; set; }
  public double? Price { get; set; }
}
