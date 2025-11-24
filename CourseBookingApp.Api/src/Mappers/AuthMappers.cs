using CourseBookingApp.Api.src.Dtos;
using CourseBookingApp.Api.src.Models.Entities;

namespace CourseBookingApp.Api.src.Mappers;

public static class AuthMapper
{
  public static LoginDto Normalize(this LoginDto loginDto)
  {
    loginDto.Email = loginDto.Email.Trim().ToLower();
    return loginDto;
  }

  public static AuthResponseDto ToAuthResponse(this User user, string token)
  {
    return new AuthResponseDto
    {
      Token = token,
      User = new UserDto
      {
        Id = user.Id,
        Email = user.Email,
        FirstName = user.FirstName,
        LastName = user.LastName,
        PhoneNumber = user.PhoneNumber,
        PhysicalAddress = user.PhysicalAddress,
        Type = user.Type.ToString()
      }
    };
  }
}
