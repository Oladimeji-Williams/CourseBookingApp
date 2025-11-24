namespace CourseBookingApp.Api.src.Models.Entities;

public class Enrollment : BaseEntity
{
  public bool IsActive { get; set; } = true;
  public int? UserId { get; set; }
  public virtual User? User { get; set; }
  public int? CourseId { get; set; }
  public virtual Course? Course { get; set; }
}
