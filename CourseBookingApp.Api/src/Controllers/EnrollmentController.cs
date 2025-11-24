using System.Security.Claims;
using CourseBookingApp.Api.src.Data.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourseBookingApp.Api.src.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class EnrollmentController(IEnrollmentService enrollmentService) : ControllerBase
{
    private readonly IEnrollmentService _enrollmentService = enrollmentService;

    private int CurrentUserId =>
        int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

    [HttpPost("{courseId:int}")]
    public async Task<IActionResult> Enroll(int courseId)
    {
        var enrolled = await _enrollmentService.EnrollAsync(CurrentUserId, courseId);
        return enrolled == null ? NotFound() : Ok(enrolled);
    }

    [HttpGet]
    public async Task<IActionResult> MyEnrollments()
        => Ok(await _enrollmentService.GetUserEnrollmentsAsync(CurrentUserId));

    [HttpDelete("{courseId:int}")]
    public async Task<IActionResult> Cancel(int courseId)
    {
        var ok = await _enrollmentService.CancelEnrollmentAsync(CurrentUserId, courseId);
        return ok ? NoContent() : NotFound();
    }
}
