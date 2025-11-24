// using CourseBookingApp.Api.src.Data;
// using CourseBookingApp.Api.src.Models.Entities;
// using ExpensesApp.API.src.Models.Entities;
// using ExpensesApp.API.src.Models.Enums;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.EntityFrameworkCore;

// namespace ExpensesApp.API.src.Data
// {
//     public static class DataSeeder_Manual
//     {
//         public static async Task SeedAsync(AppDbContext context)
//         {
//             Console.WriteLine("Starting database seeding...");

//             await context.Database.MigrateAsync();

//             if (await context.Users.AnyAsync())
//             {
//                 Console.WriteLine("⚠️ Database already has data — skipping seeding.");
//                 return;
//             }

//             var hasher = new PasswordHasher<User>();

//             var users = new List<User>
//             {
//                 new User
//                 {
//                     Email = "john.doe@example.com",
//                     FirstName = "John",
//                     LastName = "Doe",
//                     PhoneNumber = "08011112222",
//                     Address = "123 Main Street, Lagos"
//                 },
//                 new User
//                 {
//                     Email = "jane.smith@example.com",
//                     FirstName = "Jane",
//                     LastName = "Smith",
//                     PhoneNumber = "08033334444",
//                     Address = "45 Palm Grove, Abuja"
//                 }
//             };

//             foreach (var user in users)
//             {
//                 user.PasswordHash = hasher.HashPassword(user, "password");
//             }

//             await context.Users.AddRangeAsync(users);
//             await context.SaveChangesAsync();

//             var transactions = new List<Transaction>
//             {
//                 new Transaction
//                 {
//                     Type = TransactionType.Income,
//                     Amount = 250000,
//                     Category = TransactionCategory.Salary,
//                     UserId = users[0].Id
//                 },
//                 new Transaction
//                 {
//                     Type = TransactionType.Expense,
//                     Amount = 15000,
//                     Category = TransactionCategory.Food,
//                     UserId = users[0].Id
//                 },
//                 new Transaction
//                 {
//                     Type = TransactionType.Expense,
//                     Amount = 70000,
//                     Category = TransactionCategory.Travel,
//                     UserId = users[1].Id
//                 }
//             };

//             await context.Transactions.AddRangeAsync(transactions);
//             await context.SaveChangesAsync();

//             Console.WriteLine("✅ Sample users and transactions added successfully!");
//         }
//     }
// }
