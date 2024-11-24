using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using TestTaskDotNetMVC.Models;

namespace TestTaskDotNetMVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Success([FromQuery] ICollection<ICollection<string>> Answers)
        {
            try
            {
                if (Answers == null || Answers.Count == 0)
                {
                    return View("Error", new { message = "No answers provided." });
                }

                foreach (var answer in Answers)
                {
                    Console.WriteLine(answer);
                }

                return View("Success", Answers);
            }
            catch (Exception ex)
            {
                return View("Error", new { message = ex.Message });
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
