namespace CourseBookingApp.Api.src.Validators;
public static class ImageValidators
{
  private static readonly string[] AllowedTypes = ["image/jpeg", "image/png", "image/webp"];
  private const long MaxSizeInMB = 3;

  public static void Validate(IFormFile file)
  {
    if (file == null || file.Length == 0)
      throw new Exception("No file provided.");

    if (!AllowedTypes.Contains(file.ContentType))
      throw new Exception("Only JPG, PNG and WEBP files are allowed.");

    if (file.Length > MaxSizeInMB * 1024 * 1024)
      throw new Exception($"File size cannot exceed {MaxSizeInMB}MB.");
  }
}
