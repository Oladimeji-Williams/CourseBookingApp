using CourseBookingApp.Api.src.Data.Interfaces;

namespace CourseBookingApp.Api.src.Data.Services;

public class ImageService(IImageRepository imageRepository) : IImageService
{
  private readonly IImageRepository _imageRepository = imageRepository;

  public async Task<string?> ReplaceImageAsync(string? oldUrl, IFormFile newImage, string folder)
  {
    // 1. Delete old image
    if (!string.IsNullOrEmpty(oldUrl))
    {
      var publicId = oldUrl.Split('/').Last().Split('.').First();
      await _imageRepository.DeleteImageAsync(publicId);
    }

    // 2. Upload new image
    var result = await _imageRepository.UploadImageAsync(newImage, folder);

    return result.SecureUrl?.ToString();
  }
}
