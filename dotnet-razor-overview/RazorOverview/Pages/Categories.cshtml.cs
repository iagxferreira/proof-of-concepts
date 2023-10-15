using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RazorOverview.Pages
{
    public class CategoriesModel : PageModel
    {
        public List<Category> Categories { get; set; } = new();

        public void OnGet(int skip = 0, int take = 25)
        {
            var temp = new List<Category>();
            for(var i = 0; i <= 100; i++)
            {
                temp.Add(new Category(i, $"Category {i}", i* 10000M));
            }

            Categories = temp
                .Skip(skip)
                .Take(take)
                .ToList();
        }
    }
}

public record Category(int Id, string Title, decimal Price);