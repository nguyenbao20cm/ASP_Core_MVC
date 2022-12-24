using doanTest.Interfaces;
using Eshop.Interfaces;
using Eshop.Models;
using Microsoft.AspNetCore.Mvc;

namespace Eshop.Controllers
{
    [Route("homeadmin")]
    public class HomeAdminController:Controller
    {
        private readonly IWebHostEnvironment _environment;
        private IAccountService _accountService;
        private IProductsService _productService;

        public HomeAdminController(IWebHostEnvironment webHostEnvironment, IAccountService accountService, IProductsService productsService)
        {
            _accountService = accountService;
            _productService = productsService;
        }

        [Route("index")]
        public IActionResult Index()
        {   
            //var obj = db.Accounts.SingleOrDefault(a => a.UserName.Equals(account.UserName));
            //if (HttpContext.Session.GetString("username") == null)
            //{
            //    return RedirectToAction("Login", "Account");

            //}
            //if (db.Accounts.SingleOrDefault(a => a.UserName == HttpContext.Session.GetString("username")).Role != 1)
            //{
            //    return RedirectToAction("Index", "Home");
            //}
            //return View();

            //HttpContext.Session.SetInt32("id", obj.Id);
            //HttpContext.Session.SetString("username", obj.UserName);
            //HttpContext.Session.SetString("fullname", obj.FullName);
            //HttpContext.Session.SetString("photo", obj.Photo);
            //HttpContext.Session.SetInt32("role", obj.Role.Value);
            return View();

        }


        // Accounts
        [Route("member")]


        // get all 
        public IActionResult Member(string Search, int i)
        {
            var listaccount = _accountService.getAll();
            return View("Member",listaccount);

        }
       

        // delete account
        [Route("deletemember")]
        public IActionResult DeleteMember(int id)
        {
            var accounts = _accountService.DeleteMember(id);
            return RedirectToAction("Member","HomeAdmin");

        }

        // create account
        [Route("createmember")]
        [HttpGet]
        public IActionResult CreateMember()
        {

            return View();
        }
        [Route("createmember")]
        [HttpPost]
        public IActionResult CreateMember(AccountViewModel account)
        {
            try
            {
                if (account.ImageFile != null)
                {
                    var fileName = account.Id.ToString() + Path.GetExtension(account.ImageFile.FileName);
                    var uploadFolder = Path.Combine(_environment.WebRootPath, "img", "avatar");
                    var uploadPath = Path.Combine(uploadFolder, fileName);
                    using (FileStream fs = System.IO.File.Create(uploadPath))
                    {
                        account.ImageFile.CopyTo(fs);
                        fs.Flush();
                    }
                    account.Avatar = fileName;
                }
                _accountService.CreateMember(account);
                return RedirectToAction("Member", "HomeAdmin") ;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return View();
            }
        }

        // update account
        [Route("updatemember/{id}")]
        [HttpGet]
        public IActionResult UpdateMember(int id)
        {
            return View(_accountService.GetMember(id));
        }

        [Route("updatemember/{id}")]
        [HttpPost]
        public IActionResult UpdateMember(int id, AccountViewModel account)
        {
            try
            {            
                _accountService.EditMember(account,id,account.Password);
                return RedirectToAction("Member", "HomeAdmin");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return View();
            }

        }

        // Product

        [Route("product")]

        // get all
        public IActionResult Product(string Search, int i)
        {
            var listproduct = _productService.getAll();
            return View("Product", listproduct);

        }

        // delete product
        [Route("deleteproduct")]
        public IActionResult DeleteProduct(int id)
        {
            var accounts = _productService.DeleteProduct(id);
            return RedirectToAction("Product", "HomeAdmin");

        }

        // create product
        [Route("createproduct")]
        [HttpGet]
        public IActionResult CreateProduct()
        {

            return View();
        }
        [Route("createproduct")]
        [HttpPost]
        public IActionResult CreateProduct(Product product)
        {
            try
            {
                //account = new AccountViewModel();
                _productService.CreateProduct(product);
                return RedirectToAction("Product", "HomeAdmin");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return View();
            }



        }



    }
}
