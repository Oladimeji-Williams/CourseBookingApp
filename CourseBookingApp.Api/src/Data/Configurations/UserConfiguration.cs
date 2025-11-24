using CourseBookingApp.Api.src.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourseBookingApp.Api.src.Data.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
  public void Configure(EntityTypeBuilder<User> entityTypeBuilder)
  {
    entityTypeBuilder.ToTable("Users");

    entityTypeBuilder.HasKey(u => u.Id);

    entityTypeBuilder.Property(u => u.Email)
        .IsRequired()
        .HasMaxLength(200);

    entityTypeBuilder.Property(u => u.PasswordHash)
        .IsRequired();

    entityTypeBuilder.Property(u => u.FirstName)
        .HasMaxLength(100);

    entityTypeBuilder.Property(u => u.LastName)
        .HasMaxLength(100);

    entityTypeBuilder.Property(u => u.PhoneNumber)
        .HasMaxLength(20); // store as string for international numbers

    entityTypeBuilder.Property(u => u.PhysicalAddress)
        .HasMaxLength(300);

    // Store enum as string
    entityTypeBuilder.Property(u => u.Type)
        .HasConversion<string>()
        .IsRequired()
        .HasMaxLength(20);

    // Relationships
    entityTypeBuilder.HasMany(u => u.Enrollments)
        .WithOne(e => e.User)
        .HasForeignKey(e => e.UserId)
        .OnDelete(DeleteBehavior.Cascade);
  }
}
