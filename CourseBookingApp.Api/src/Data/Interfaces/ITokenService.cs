using CourseBookingApp.Api.src.Models.Entities;

namespace CourseBookingApp.Api.src.Data.Interfaces;

public interface ITokenService
{
  string GetToken(User user);
}
