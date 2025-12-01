using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using CourseBookingApp.Api.src.Data.Interfaces;

namespace CourseBookingApp.Api.src.Data.Repositories;

public class ImageRepository
(
  Cloudinary cloudinary
) : IImageRepository
{
  private readonly Cloudinary _cloudinary = cloudinary;

  public async Task<DeletionResult> DeleteImageAsync(string publicId)
  {
    var deletionParams = new DeletionParams(publicId)
    {
      Invalidate = true // automatically invalidates cached versions on CDN
    };
    return await _cloudinary.DestroyAsync(deletionParams);
  }

  public async Task<ImageUploadResult> UploadImageAsync(ImageUploadParams uploadParams)
  {
    uploadParams.Invalidate = true; // invalidate cache if overwriting
    return await _cloudinary.UploadAsync(uploadParams);
  }
}
