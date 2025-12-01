using CourseBookingApp.Api.src.Data.Interfaces;
using CourseBookingApp.Api.src.Dtos;
using CourseBookingApp.Api.src.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourseBookingApp.Api.src.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CoursesController(
    ICoursesService coursesService,
    IImageService imageService,
    ICoursesRepository coursesRepository
) : ControllerBase
{
    private readonly ICoursesService _coursesService = coursesService;
    private readonly IImageService _imageService = imageService;
    private readonly ICoursesRepository _coursesRepository = coursesRepository;

    [HttpGet]
    public async Task<IActionResult> GetCourses()
    {
        return Ok(await _coursesService.GetCoursesAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetCourse(int id)
    {
        var course = await _coursesService.GetCourseByIdAsync(id);
        return course == null ? NotFound() : Ok(course);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateCourse(CreateCourseDto createCourseDto)
        => Ok(await _coursesService.CreateCourseAsync(createCourseDto));

    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateCourse(int id, UpdateCourseDto updateCourseDto)
    {
        var updated = await _coursesService.UpdateCourseAsync(id, updateCourseDto);
        return updated == null ? NotFound() : Ok(updated);
    }


    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteCourse(int id)
    {
        var deleted = await _coursesService.DeleteCourseAsync(id);
        return deleted ? NoContent() : NotFound();
    }
    [HttpPost("{courseId:int}/upload-image")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UploadCourseImage(int courseId, IFormFile formFile)
    {
        if (formFile == null || formFile.Length == 0)
            return BadRequest("No image provided");

        var course = await _coursesRepository.GetCourseByIdAsync(courseId);
        if (course == null)
            return NotFound("Course not found");

        var safeTitle = course.Title?.Replace(" ", "_").ToLower() ?? "course";
        var fileName = $"{course.Id}_{safeTitle}";

        await _imageService.UpdateEntityImageAsync(course, formFile, "course_images", fileName);

        await _coursesRepository.SaveChangesAsync();

        return Ok(new { imageUrl = course.ImgUrl });
    }


}
