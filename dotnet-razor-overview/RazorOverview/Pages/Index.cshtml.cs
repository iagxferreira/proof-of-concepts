using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RazorOverview.Pages;

public class IndexModel : PageModel
{

    public List<Category> Categories { get; set; } = new();
    public async Task OnGet()
    {
        //await Task.Delay(5000);
        for(var i = 0; i <= 100; i++)
        {
            Categories.Add(new Category(i, $"Category {i}", i * 10000M));
        }
    }

    public void OnPost()
    {
    }
}

public record Category(int Id, string Title, decimal Price);
