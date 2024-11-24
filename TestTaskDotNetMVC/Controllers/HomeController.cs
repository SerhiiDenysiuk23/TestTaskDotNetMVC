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

        [HttpPost]
        public IActionResult Submit([FromBody] FormModel model)
        {
            try
            {
                var result = model.Answers;

                return Ok(new { success = true, message = "Data submitted successfully!", data = result});
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = "An error occurred.", details = ex.Message });
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
