namespace GettingStarted.Consumers;

using System.Threading.Tasks;
using Contracts;
using MassTransit;
using Microsoft.Extensions.Logging;

public class GettingStartedConsumer :
    IConsumer<GettingStartedContract>
{
    readonly ILogger<GettingStartedConsumer> _logger;

    public GettingStartedConsumer(ILogger<GettingStartedConsumer> logger)
    {
        _logger = logger;
    }

    public Task Consume(ConsumeContext<GettingStartedContract> context)
    {
        _logger.LogInformation("Received Text: {Text}", context.Message.Value);
        return Task.CompletedTask;
    }
}
