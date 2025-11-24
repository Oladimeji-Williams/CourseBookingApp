using CourseBookingApp.Api.src.Dtos;
using CourseBookingApp.Api.src.Models.Entities;

namespace CourseBookingApp.Api.src.Mappers;

public static class EnrollmentMapper
{
    public static EnrollmentDto ToDto(Enrollment enrollment)
    {
        return new EnrollmentDto
        {
            Id = enrollment.Id,
            IsActive = enrollment.IsActive,
            UserId = enrollment.UserId!.Value,
            CourseId = enrollment.CourseId!.Value
        };
    }
}
