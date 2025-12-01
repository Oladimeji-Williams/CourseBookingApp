using CloudinaryDotNet.Actions;

namespace CourseBookingApp.Api.src.Data.Interfaces;

public interface IImageRepository
{
  Task<ImageUploadResult> UploadImageAsync(ImageUploadParams uploadParams);
  Task<DeletionResult> DeleteImageAsync(string publicId);
  

}
