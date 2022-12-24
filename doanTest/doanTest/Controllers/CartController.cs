using doanTest.Data;
using Eshop.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace doanTest.Controllers
{
    public class CartController : Controller
    {
        private readonly EshopContex _context;
        private readonly IWebHostEnvironment _environment;
        public CartController(EshopContex context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        public IActionResult Index(int  id)
        {
            ViewBag.isLogin = HttpContext.Session.GetString("isLogin");
            ViewBag.ten = HttpContext.Session.GetString("username");
            ViewBag.id = HttpContext.Session.GetString("id");
            return View(_context.carts.Include(c=>c.Account).Include(c => c.Product).Where(c=>c.Account.Id==id).ToList());
        }
        public IActionResult ThanhToan(int id)
        {
            ViewBag.isLogin = HttpContext.Session.GetString("isLogin");
            ViewBag.ten = HttpContext.Session.GetString("username");
            ViewBag.id = HttpContext.Session.GetString("id");
            var acc = _context.Accounts.FirstOrDefault(a => a.Id == id);
            var Cart = _context.carts.Include(c => c.Account).Include(c => c.Product).Where(c => c.Account.Id == id).ToList();
            var total = Cart.Sum(c=>c.Quantity*c.Product.Price);
            var invoice = new Invoice
            {
                Code = DateTime.Now.ToString("yyyyMMddhhmmss"),
                AccountId = acc.Id,
                IssuedDate = DateTime.Now,
                ShippingAddress = acc.Address,
                ShippingPhone = acc.Phone,
                Total = total,
                Status = true
            };
            _context.invoices.Add(invoice);
            _context.SaveChanges();
            foreach(var c in Cart)
            {
                InvoiceDetail detal = new InvoiceDetail
                {
                    InvoiceId = invoice.Id,
                ProductId =c.ProductId,
                Quantity=c.Quantity,
                UnitPrice=c.Product.Price,
                };
                _context.InvoiceDetails.Add(detal);
                _context.carts.Remove(c);
            }
            _context.SaveChanges();
            
            return RedirectToAction("index","home");
        }
        public IActionResult Add(int id,int proid)
        {
            ViewBag.isLogin = HttpContext.Session.GetString("isLogin");
            ViewBag.ten = HttpContext.Session.GetString("username");
            ViewBag.id = HttpContext.Session.GetString("id");
            var a = _context.carts.Include(c => c.Account).Include(c => c.Product).Where(c => c.Account.Id == id).Where(c => c.ProductId == proid).FirstOrDefault();

            a.Quantity++;
            _context.SaveChanges();
            return RedirectToAction(actionName:"index",controllerName:"Cart",new {id= int.Parse(HttpContext.Session.GetString("id")) });
        }
        public IActionResult Delete(int id, int proid)
        {
            ViewBag.isLogin = HttpContext.Session.GetString("isLogin");
            ViewBag.ten = HttpContext.Session.GetString("username");
            ViewBag.id = HttpContext.Session.GetString("id");
            var a = _context.carts.Include(c => c.Account).Include(c => c.Product).Where(c => c.Account.Id == id).Where(c=>c.ProductId==proid).FirstOrDefault();

            a.Quantity--;
            _context.SaveChanges();
            if (a.Quantity == 0)
                _context.Remove(a);_context.SaveChanges();
            return RedirectToAction(actionName: "index", controllerName: "Cart", new { id = int.Parse(HttpContext.Session.GetString("id")) });
        }
        public IActionResult DeleteAll(int id)
        {
            ViewBag.isLogin = HttpContext.Session.GetString("isLogin");
            ViewBag.ten = HttpContext.Session.GetString("username");
            ViewBag.id = HttpContext.Session.GetString("id");
            var a = _context.carts.Include(c => c.Account).Include(c => c.Product).Where(c => c.Account.Id == id).ToList();
            foreach (var i in a)
            {
                _context.carts.Remove(i);
            }
            _context.SaveChanges();
            return RedirectToAction(actionName: "index", controllerName: "Cart", new { id = int.Parse(HttpContext.Session.GetString("id")) });

        }
        public IActionResult Them(int id)
        {
            ViewBag.isLogin = HttpContext.Session.GetString("isLogin");
            ViewBag.ten = HttpContext.Session.GetString("username");
            ViewBag.id = HttpContext.Session.GetString("id");
            var cart = _context.carts.Include(c => c.Account).Include(c => c.Product).Where(c => c.ProductId == id).Where(c => c.Account.Id == int.Parse(HttpContext.Session.GetString("id"))).FirstOrDefault();
            if (cart != null)
            {
                cart.Quantity += 1;
                _context.carts.Update(cart);
                _context.SaveChanges();
            }
            else
            {
                Cart a = new Cart
                {
                    AccountId = int.Parse(HttpContext.Session.GetString("id")),
                    ProductId = id,
                    Quantity = 1
                };
            _context.carts.Add(a);
            _context.SaveChanges(); 
            }
            return RedirectToAction(actionName: "index", controllerName: "Cart", new { id = int.Parse(HttpContext.Session.GetString("id")) });

        }

    }    
            

        }
   
