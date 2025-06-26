public class ArtificialDelayMiddleware
{
    private readonly RequestDelegate _next;

    public ArtificialDelayMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        //await Task.Delay(1000); // 2-second delay
        await _next(context);
    }
}