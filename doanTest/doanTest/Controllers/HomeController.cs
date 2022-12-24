using doanTest.Data;
using doanTest.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Security.Principal;

namespace doanTest.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private  EshopContex _context;

        public HomeController(EshopContex context)
        {
            _context = context;
        }
        
        public IActionResult Index()
        {

            ViewBag.isLogin = HttpContext.Session.GetString("isLogin");
            ViewBag.ten = HttpContext.Session.GetString("username");
            ViewBag.id = HttpContext.Session.GetString("id");
            return View(_context.products.ToList());
        }


        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}