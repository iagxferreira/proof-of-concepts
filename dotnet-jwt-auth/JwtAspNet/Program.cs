using JwtAspNet.Models;
using JwtAspNet.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddTransient<TokenService>();
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();

var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();


app.MapGet("/", (TokenService service) => {
    return service.Create(new User(1, "Iago Ferreira", "iago-ferreira@outlook.com", "teste.png", "password", new[] { "admin", "client" }));
});
app.Run();
