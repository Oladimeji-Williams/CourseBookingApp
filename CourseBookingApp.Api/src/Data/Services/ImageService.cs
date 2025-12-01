using CourseBookingApp.Api.src.Data.Interfaces;
using CloudinaryDotNet.Actions;
using CloudinaryDotNet;

namespace CourseBookingApp.Api.src.Data.Services;

public class ImageService
(
  IImageRepository imageRepository
) : IImageService
{
  private readonly IImageRepository _imageRepository = imageRepository;

  public async Task<(string newUrl, string newPublicId)> ReplaceImageAsync(
      string? oldPublicId, IFormFile file, string folder, string fileName)
  {
    // 1) Delete old image if exists
    if (!string.IsNullOrEmpty(oldPublicId))
    {
      await _imageRepository.DeleteImageAsync(oldPublicId);
    }

    // 2) Upload new image
    var uploadParams = new ImageUploadParams
    {
      File = new FileDescription(file.FileName, file.OpenReadStream()),
      Folder = folder,
      PublicId = fileName,
      Overwrite = true,
      UniqueFilename = false,
      UseFilename = true
    };

    var uploadResult = await _imageRepository.UploadImageAsync(uploadParams);
    return (uploadResult.SecureUrl!.ToString(), uploadResult.PublicId);
  }

  public async Task UpdateEntityImageAsync<T>(
      T entity, IFormFile file, string folder, string fileName)
      where T : class, IHasImage
  {
    var (url, publicId) = await ReplaceImageAsync(entity.ImgPublicId, file, folder, fileName);
    entity.ImgUrl = url;
    entity.ImgPublicId = publicId;
  }
}
