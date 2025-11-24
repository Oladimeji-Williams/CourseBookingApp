using System.Text;
using CloudinaryDotNet;
using CourseBookingApp.Api.src.Data;
using CourseBookingApp.Api.src.Data.Interceptors;
using CourseBookingApp.Api.src.Data.Interfaces;
using CourseBookingApp.Api.src.Data.Repositories;
using CourseBookingApp.Api.src.Data.Services;
using CourseBookingApp.Api.src.Models;
using CourseBookingApp.Api.src.Models.Entities;
using CourseBookingApp.Api.src.Validators;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace CourseBookingApp.Api.src.Extensions;

public static class ServiceCollectionExtension
{
  public static IServiceCollection AddMyDatabase(this IServiceCollection services, IConfiguration configuration)
  {
    var connectionString = configuration.GetConnectionString("DefaultConnection");
    services.AddDbContext<AppDbContext>((serviceProvider, options) =>
    {
      options.UseSqlServer(connectionString);
      var interceptor = serviceProvider.GetRequiredService<TimeStampInterceptor>();
      options.AddInterceptors(interceptor);
    });
    return services;
  }
  public static IServiceCollection AddMyRepositories(this IServiceCollection services)
  {
    services.AddScoped<IAuthRepository, AuthRepository>();
    services.AddScoped<IUsersRepository, UsersRepository>();
    services.AddScoped<ICoursesRepository, CoursesRepository>();
    services.AddScoped<IEnrollmentRepository, EnrollmentRepository>();
    services.AddScoped<IImageService, ImageService>();
    services.AddScoped<IImageRepository, ImageRepository>();

    return services;
  }
  public static IServiceCollection AddMyServices(this IServiceCollection services)
  {
    services.AddScoped<IAuthService, AuthService>();
    services.AddScoped<IUsersService, UsersService>();
    services.AddScoped<ICoursesService, CoursesService>();
    services.AddScoped<IEnrollmentService, EnrollmentService>();
    return services;
  }
  public static IServiceCollection AddMyCors(this IServiceCollection services)
  {
    services.AddCors(options =>
    {
      options.AddPolicy("AllowAll", policy =>
      {
        policy.WithOrigins(
          "http://localhost:4200",
          "https://happy-smoke-0b506f81e.6.azurestaticapps.net"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
      });
    });
    return services;
  }

  public static IServiceCollection AddMyCloudinary(this IServiceCollection services)
  {
    services.AddSingleton(provider =>
    {
      var config = provider.GetRequiredService<IConfiguration>();

      var account = new Account(
      config["Cloudinary:CloudName"],
      config["Cloudinary:ApiKey"],
      config["Cloudinary:ApiSecret"]
      );

      return new Cloudinary(account);
    });
    return services;
  }
  public static IServiceCollection AddMyJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
  {
    // Read values from appsettings.json
    var jwtKey = configuration["Jwt:Key"];
    var jwtIssuer = configuration["Jwt:Issuer"];
    var jwtAudience = configuration["Jwt:Audience"];

    if (string.IsNullOrWhiteSpace(jwtKey))
      throw new InvalidOperationException("JWT Key is missing in configuration.");

    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
          options.TokenValidationParameters = new TokenValidationParameters
          {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(
                          Encoding.UTF8.GetBytes(jwtKey)
                      )
          };
        });

    return services;
  }
  public static IServiceCollection AddMySwagger(this IServiceCollection services)
  {
    services.AddSwaggerGen(c =>
    {
      c.SwaggerDoc("v1", new() { Title = "CourseBookingAppAPI", Version = "v1" });

      c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
      {
        In = ParameterLocation.Header,
        Description = "Enter JWT token like: Bearer {your token}",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
      });

      c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
        });
    });
    return services;
  }
  public static IServiceCollection AddMyExtensions(this IServiceCollection services, IConfiguration configuration)
  {
    services.Configure<CloudinarySettings>(configuration.GetSection("Cloudinary"));
    services.AddSingleton(provider =>
    {
      var config = provider.GetRequiredService<IOptions<CloudinarySettings>>().Value;
      return new Cloudinary(new Account(config.CloudName, config.ApiKey, config.ApiSecret));
    });
    services.AddScoped<ITokenService, TokenService>();
    services.AddSingleton<TimeStampInterceptor>();
    services.AddSingleton<PasswordHasher<User>>();
    return services;
  }
  public static IServiceCollection AddMyControllers(this IServiceCollection services)
  {
    services.AddControllers()
        .AddFluentValidation(cfg => cfg.RegisterValidatorsFromAssemblyContaining<RegisterDtoValidator>());
    return services;
  }
  public static IServiceCollection AddMyValidators(this IServiceCollection services)
  {
    services.AddValidatorsFromAssemblyContaining<RegisterDtoValidator>();
    return services;
  }
}
