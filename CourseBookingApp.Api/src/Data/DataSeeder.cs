using Bogus;
using CourseBookingApp.Api.src.Data;
using CourseBookingApp.Api.src.Models.Entities;
using CourseBookingApp.Api.src.Models.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public static class DataSeeder
{
    public static async Task SeedAsync(AppDbContext appDbContext, PasswordHasher<User> passwordHasher)
    {
        Console.WriteLine("🌱 Starting database seeding...");

        await appDbContext.Database.MigrateAsync();

        // 1️⃣ Seed Admin
        if (!await appDbContext.Users.AnyAsync(u => u.Type == UserType.Admin))
        {
            var admin = new User
            {
                Email = "admin@example.com",
                FirstName = "System",
                LastName = "Admin",
                PhysicalAddress = "HQ",
                PhoneNumber = "8090000000",
                Type = UserType.Admin,
                PasswordHash = ""
            };
            admin.PasswordHash = passwordHasher.HashPassword(admin, "Admin@123");
            await appDbContext.Users.AddAsync(admin);
            await appDbContext.SaveChangesAsync();
            Console.WriteLine("✔ Admin user created.");
        }

        // 2️⃣ Seed Students
        if (!await appDbContext.Users.AnyAsync(u => u.Type == UserType.Student))
        {
            var userFaker = new Faker<User>("en")
                .RuleFor(u => u.FirstName, f => f.Name.FirstName())
                .RuleFor(u => u.LastName, f => f.Name.LastName())
                .RuleFor(u => u.Email, f => f.Internet.Email())
                .RuleFor(u => u.PhoneNumber, f => f.Random.ReplaceNumbers("080########"))
                .RuleFor(u => u.PhysicalAddress, f => f.Address.FullAddress())
                .RuleFor(u => u.Type, _ => UserType.Student)
                .FinishWith((f, u) => u.PasswordHash = passwordHasher.HashPassword(u, "password"));

            var students = userFaker.Generate(5);
            await appDbContext.Users.AddRangeAsync(students);
            await appDbContext.SaveChangesAsync();
            Console.WriteLine($"✔ Seeded {students.Count} students.");
        }

        // 3️⃣ Seed Courses
        if (!await appDbContext.Courses.AnyAsync())
        {
            string[] sampleImages = new[]
            {
                "https://via.placeholder.com/150/0000FF",
                "https://via.placeholder.com/150/FF0000",
                "https://via.placeholder.com/150/00FF00",
                "https://via.placeholder.com/150/FFFF00",
                "https://via.placeholder.com/150/FF00FF"
            };

            var courseFaker = new Faker<Course>("en")
                .RuleFor(c => c.Title, f => f.Company.CatchPhrase())
                .RuleFor(c => c.Description, f => f.Lorem.Paragraph())
                .RuleFor(c => c.Price, f => Math.Round(f.Random.Double(5000, 35000), 2))
                .RuleFor(c => c.Type, f => f.PickRandom<CourseType>())
                .RuleFor(c => c.Img, f => f.PickRandom(sampleImages))
                .RuleFor(c => c.SoldOut, f => f.Random.Bool())
                .RuleFor(c => c.OnSale, f => f.Random.Bool())
                .RuleFor(c => c.Created, f => f.Date.Past(2))
                .RuleFor(c => c.Modified, f => f.Date.Recent(1));

            var courses = courseFaker.Generate(20);
            await appDbContext.Courses.AddRangeAsync(courses);
            await appDbContext.SaveChangesAsync();
            Console.WriteLine($"✔ Seeded {courses.Count} courses.");
        }

        // 4️⃣ Seed Enrollments
        if (!await appDbContext.Enrollments.AnyAsync())
        {
            var students = await appDbContext.Users.Where(u => u.Type == UserType.Student).ToListAsync();
            var courses = await appDbContext.Courses.ToListAsync();

            if (!courses.Any())
                throw new Exception("No courses available for enrollments.");

            var faker = new Faker();
            var enrollments = new List<Enrollment>();

            foreach (var student in students)
            {
                var count = faker.Random.Int(1, Math.Min(3, courses.Count));
                var selectedCourses = faker.PickRandom(courses, count);

                foreach (var course in selectedCourses)
                {
                    enrollments.Add(new Enrollment
                    {
                        UserId = student.Id,
                        CourseId = course.Id,
                        IsActive = true
                    });
                }
            }

            await appDbContext.Enrollments.AddRangeAsync(enrollments);
            await appDbContext.SaveChangesAsync();
            Console.WriteLine($"✔ Seeded {enrollments.Count} enrollments.");
        }

        Console.WriteLine("🎉 Database seeding complete!");
    }
}
