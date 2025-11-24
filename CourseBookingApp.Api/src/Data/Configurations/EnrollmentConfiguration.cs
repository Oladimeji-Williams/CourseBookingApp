using CourseBookingApp.Api.src.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourseBookingApp.Api.src.Data.Configurations;

public class EnrollmentConfiguration : IEntityTypeConfiguration<Enrollment>
{
  public void Configure(EntityTypeBuilder<Enrollment> entityTypeBuilder)
  {
    entityTypeBuilder.ToTable("Enrollments");

    entityTypeBuilder.HasKey(e => e.Id);

    // optional composite unique constraint prevents duplicate active enrollment
    entityTypeBuilder.HasIndex(e => new { e.UserId, e.CourseId })
      .IsUnique(false);

    entityTypeBuilder.Property(e => e.IsActive)
      .HasDefaultValue(true);

    entityTypeBuilder.HasOne(e => e.User)
      .WithMany(u => u.Enrollments)
      .HasForeignKey(e => e.UserId)
      .OnDelete(DeleteBehavior.Cascade);

    entityTypeBuilder.HasOne(e => e.Course)
      .WithMany(c => c.Enrollments)
      .HasForeignKey(e => e.CourseId)
      .OnDelete(DeleteBehavior.Cascade);
  }
}
