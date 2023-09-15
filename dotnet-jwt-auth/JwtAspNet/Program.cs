using System.Security.Claims;
using System.Text;
using JwtAspNet;
using JwtAspNet.Extensions;
using JwtAspNet.Models;
using JwtAspNet.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddTransient<TokenService>();

builder.Services.AddAuthentication( options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options => {
        options.TokenValidationParameters = new TokenValidationParameters {
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.PrivateKey)),
            ValidateIssuer = false,
            ValidateAudience = false,
        };
    });

builder.Services.AddAuthorization(options => {
    options.AddPolicy("admin", policy => policy.RequireRole("admin"));
});

var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();


app.MapGet("/login", (TokenService service) =>
{
    return service.Create(new User(1, "Iago Ferreira", "iago-ferreira@outlook.com", "teste.png", "password", new[] { "admin", "client" }));
});

app.MapGet("/restrito", (ClaimsPrincipal user) => {
    return new {
            id = user.Id(),
            name = user.Name(),
            email = user.Email(),
            givenName = user.GivenName(),
            image = user.Image(),
        };
    })
    .RequireAuthorization();
    
app.MapGet("/admin", () => "Você tem acesso")
    .RequireAuthorization("admin");

app.Run();
