using MassTransit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using POC.RabbitMQ.Consumer.Data;
using System.Reflection;

var builder = Host.CreateDefaultBuilder(args);

builder.ConfigureServices((hostContext, services) =>
{
    services.AddMassTransit(busConfigurator =>
    {
        var entryAssembly = Assembly.GetExecutingAssembly();
        busConfigurator.AddConsumers(entryAssembly);
        busConfigurator.UsingRabbitMq((context, busFactoryConfigurator) =>
        {
            busFactoryConfigurator.Host("localhost", "/", h => { });
            busFactoryConfigurator.ConfigureEndpoints(context);
        });
    });

    services.AddDbContext<AppDataContext>(options =>
    {
        options.UseSqlServer("Server=localhost,1433;Database=POCRabbitMQ;User ID=sa;Password=1q2w3e4r@#$;Trusted_Connection=False; TrustServerCertificate=True;");
    });
});

var app = builder.Build();

app.Run();