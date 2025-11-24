namespace CourseBookingApp.Api.src.Data.Interfaces;

public interface IImageService
{
  Task<string?> ReplaceImageAsync(string? oldUrl, IFormFile formFile, string folder);
}
