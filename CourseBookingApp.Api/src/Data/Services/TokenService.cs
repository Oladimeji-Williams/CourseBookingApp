
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CourseBookingApp.Api.src.Data.Interfaces;
using CourseBookingApp.Api.src.Models.Entities;
using Microsoft.IdentityModel.Tokens;

namespace CourseBookingApp.Api.src.Data.Services;

public class TokenService
(
  IConfiguration configuration
) : ITokenService
{
  private readonly IConfiguration _configuration = configuration;
  public string GetToken(User user)
  {
    var claims = new[]
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Type.ToString())
    };

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: _configuration["Jwt:Issuer"],
        audience: _configuration["Jwt:Audience"],
        claims: claims,
        expires: DateTime.UtcNow.AddMinutes(double.Parse(_configuration["Jwt:ExpireMinutes"] ?? "60")),
        signingCredentials: creds
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
  }
}
