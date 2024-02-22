using MassTransit;
using Microsoft.AspNetCore.Mvc;
using POC.RabbitMQ.Shared.Contracts;

[ApiController]
[Route("[controller]")]
public class GettingStartedController : ControllerBase
{
    public readonly IPublishEndpoint publishEndpoint;

    public GettingStartedController(IPublishEndpoint publishEndpoint)
    {
        this.publishEndpoint = publishEndpoint;
    }

    [HttpPost]
    public async Task<IActionResult> Notify(GettingStartedContract gettingStartedContract)
    {
        await publishEndpoint.Publish<GettingStartedContract>(new
        {
            gettingStartedContract.Value
        });

        return Ok();
    }
}