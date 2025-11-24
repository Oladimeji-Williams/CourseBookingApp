namespace CourseBookingApp.Api.src.Dtos;

public class EnrollmentDto
{
  public int Id { get; set; }
  public bool IsActive { get; set; }
  public int UserId { get; set; }
  public int CourseId { get; set; }
}
