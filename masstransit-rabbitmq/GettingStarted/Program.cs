using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using MassTransit;
using GettingStarted.Workers;
using Microsoft.Extensions.DependencyInjection;

namespace GettingStarted
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            await CreateHostBuilder(args).Build().RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) => Host.CreateDefaultBuilder(args)
            .ConfigureServices((hostContext, services) =>
        {
            services.AddMassTransit(x =>
            {
                // elided...

                x.UsingRabbitMq((context, cfg) =>
                {
                    cfg.Host("localhost", "/", h =>
                    {
                        h.Username("guest");
                        h.Password("guest");
                    });

                    cfg.ConfigureEndpoints(context);
                });
            });

            services.AddHostedService<Worker>();
        });
    }
}
