using CourseBookingApp.Api.src.Data.Interfaces;
using CourseBookingApp.Api.src.Models.Enums;

namespace CourseBookingApp.Api.src.Models.Entities;

public class User : BaseEntity, IHasImage
{
  public required string Email { get; set; }
  public required string PasswordHash { get; set; }
  public string? FirstName { get; set; }
  public string? LastName { get; set; }
  public string? PhoneNumber { get; set; }
  public string? PhysicalAddress { get; set; }
  public string? ImgUrl {get; set;}
  public string? ImgPublicId { get; set; }
  public UserType Type { get; set; } = UserType.Student;
  public ICollection<Enrollment>? Enrollments { get; set; } = new List<Enrollment>();
}
