using CourseBookingApp.Api.src.Data;
using CourseBookingApp.Api.src.Extensions;
using CourseBookingApp.Api.src.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;
bool isSeeding = args.Contains("--seed");
builder.Services
    .AddMyDatabase(config)
    .AddMyRepositories()
    .AddMyCors()
    .AddMyServices()
    .AddMyExtensions(config)
    .AddMyJwtAuthentication(config)
    .AddMySwagger()
    .AddMyControllers()
    .AddMyCloudinary()
    .AddMyValidators();
builder.Services.AddEndpointsApiExplorer();


var app = builder.Build();

// ---------------- SEEDING MODE ----------------
if (isSeeding)
{
    Console.WriteLine("🔧 Seeder mode detected. Starting database seeding...");

    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var hasher = scope.ServiceProvider.GetRequiredService<PasswordHasher<User>>(); // ✅ inject hasher

    // Ensure database is up to date
    await context.Database.MigrateAsync();

    // Clear existing data safely
    if (await context.Enrollments.AnyAsync())
        context.Enrollments.RemoveRange(context.Enrollments);

    if (await context.Users.AnyAsync())
        context.Users.RemoveRange(context.Users);

    if (await context.Courses.AnyAsync())
        context.Courses.RemoveRange(context.Courses);

    await context.SaveChangesAsync();

    // Seed data
    await DataSeeder.SeedAsync(context, hasher);

    Console.WriteLine("✅ Seeding complete!");
    return;
}


if (app.Environment.IsDevelopment() || app.Environment.IsStaging())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "ExpensesApp API v1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();