using CourseBookingApp.Api.src.Data.Interfaces;
using CourseBookingApp.Api.src.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace CourseBookingApp.Api.src.Data.Repositories;

public class EnrollmentRepository(AppDbContext appDbContext) : IEnrollmentRepository
{
    private readonly AppDbContext _appDbContext = appDbContext;

    public async Task<Enrollment?> GetEnrollmentAsync(int userId, int courseId)
    {
      return await _appDbContext.Enrollments.FirstOrDefaultAsync(e => e.UserId == userId && e.CourseId == courseId);
    }

    public async Task<IEnumerable<Enrollment>> GetUserEnrollmentsAsync(int userId)
    {
      return await _appDbContext.Enrollments.Where(e => e.UserId == userId && e.IsActive).ToListAsync();
    }

    public async Task AddEnrollmentAsync(Enrollment enrollment)
    {
      await _appDbContext.Enrollments.AddAsync(enrollment);
    }
    public async Task SaveChangesAsync()
    {
      await _appDbContext.SaveChangesAsync();
    }
}