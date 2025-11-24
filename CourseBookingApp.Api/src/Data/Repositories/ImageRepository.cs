using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using CourseBookingApp.Api.src.Data.Interfaces;

namespace CourseBookingApp.Api.src.Data.Repositories;

public class ImageRepository(Cloudinary cloudinary) : IImageRepository
{
  private readonly Cloudinary _cloudinary = cloudinary;

  public async Task<ImageUploadResult> UploadImageAsync(IFormFile file, string folder)
  {
    var uploadParams = new ImageUploadParams
    {
      File = new FileDescription(file.FileName, file.OpenReadStream()),
      Folder = folder
    };

    return await _cloudinary.UploadAsync(uploadParams);
  }

  public async Task<DeletionResult> DeleteImageAsync(string publicId)
  {
    var deletionParams = new DeletionParams(publicId);
    return await _cloudinary.DestroyAsync(deletionParams);
  }
}
