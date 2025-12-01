using CourseBookingApp.Api.src.Dtos;
using CourseBookingApp.Api.src.Models.Entities;
using CourseBookingApp.Api.src.Models.Enums;

namespace CourseBookingApp.Api.src.Mappers;

public static class UserMapper
{
  public static User ToEntity(this RegisterDto registerDto, string passwordHash)
  {
    return new User
    {
      Email = registerDto.Email,
      PasswordHash = passwordHash,
      Type = UserType.Student
    };
  }

  public static UserDto ToDto(this User user)
  {
    return new UserDto
    {
      Id = user.Id,
      Email = user.Email,
      FirstName = user.FirstName,
      LastName = user.LastName,
      PhoneNumber = user.PhoneNumber,
      PhysicalAddress = user.PhysicalAddress,
      Img = user.ImgUrl,
      ImgPublicId = user.ImgPublicId,
      Type = user.Type.ToString()
    };
  }


  public static void MapUpdate(this User user, UpdateUserDto updateUserDto)
  {
    user.FirstName = updateUserDto.FirstName ?? user.FirstName;
    user.LastName = updateUserDto.LastName ?? user.LastName;
    user.PhoneNumber = updateUserDto.PhoneNumber ?? user.PhoneNumber;
    user.PhysicalAddress = updateUserDto.PhysicalAddress ?? user.PhysicalAddress;
  }

  public static void MapRole(User user, string newRole)
  {
    if (Enum.TryParse<UserType>(newRole, true, out var role))
    {
      user.Type = role;
    }
  }
}
