namespace CourseBookingApp.Api.src.Dtos;

public class UserDto
{
  public int Id { get; set; }
  public string Email { get; set; } = string.Empty;
  public string? FirstName { get; set; }
  public string? LastName { get; set; }
  public string? PhoneNumber { get; set; }
  public string? PhysicalAddress { get; set; }
  public string? Img { get; set; }
  public string? ImgPublicId { get; set; }

  public string Type { get; set; } = "Student";
}

public class UpdateUserDto
{
  public string? FirstName { get; set; }
  public string? LastName { get; set; }
  public string? PhoneNumber { get; set; }
  public string? PhysicalAddress { get; set; }
}
public class ChangeRoleDto
{
  public string Type { get; set; } = "Student"; // expected "Admin" or "Student"
}