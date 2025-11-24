using CloudinaryDotNet.Actions;

namespace CourseBookingApp.Api.src.Data.Interfaces;

public interface IImageRepository
{
  Task<ImageUploadResult> UploadImageAsync(IFormFile file, string folder);
  Task<DeletionResult> DeleteImageAsync(string publicId);
}
