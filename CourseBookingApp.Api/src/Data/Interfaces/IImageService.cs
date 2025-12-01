namespace CourseBookingApp.Api.src.Data.Interfaces;

public interface IImageService
{
  Task<(string newUrl, string newPublicId)> ReplaceImageAsync(
      string? oldPublicId, IFormFile formFile, string folder, string fileName);

  // Generic update for any entity that implements IHasImage
  Task UpdateEntityImageAsync<T>(
      T entity, IFormFile formFile, string folder, string fileName)
      where T : class, IHasImage;
}
