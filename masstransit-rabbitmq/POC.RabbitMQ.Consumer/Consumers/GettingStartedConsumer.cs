namespace POC.RabbitMQ.Consumer.Consumers;

using System;
using System.Text.Json;
using System.Threading.Tasks;
using MassTransit;
using POC.RabbitMQ.Consumer.Data;
using POC.RabbitMQ.Shared.Contracts;

public class GettingStartedConsumer : IConsumer<GettingStartedContract>
{
    private AppDataContext _context { get; set; }
    public GettingStartedConsumer(AppDataContext context)
    {
        _context = context;
    }
    public async Task Consume(ConsumeContext<GettingStartedContract> context)
    {
        var serializedMessage = JsonSerializer.Serialize(context.Message, new JsonSerializerOptions { });
        _context.GettingStartedMessages.Add(new GettingStartedMessage() { Value = context.Message.Value });
        await _context.SaveChangesAsync();
        Console.WriteLine($"NotificationCreated event consumed. Message: {serializedMessage}");
    }
}

