using CourseBookingApp.Api.src.Data.Interfaces;
using CourseBookingApp.Api.src.Models.Enums;

namespace CourseBookingApp.Api.src.Models.Entities;

public class Course: BaseEntity, IHasImage
{
  public string? Title { get; set; }
  public string? Description { get; set; }
  public double? Price { get; set; }
  public CourseType Type { get; set; }
  public string? ImgUrl { get; set; }
  public string? ImgPublicId { get; set; }
  public bool SoldOut {get; set;}
  public bool OnSale {get; set;}
  public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
}
