using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eshop.Models;
using doanTest.Data;

namespace doanTest.Controllers
{
    public class AccountsController : Controller
    {
        private readonly EshopContex _context;
        private readonly IWebHostEnvironment _environment;
        public AccountsController(EshopContex context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: Accounts
        public async Task<IActionResult> SignOut()
        {

            HttpContext.Session.SetString("isLogin", "false");
            HttpContext.Session.Remove("username");
            return RedirectToAction(nameof(Index));
        }
        public async Task<IActionResult> Index()
        {
            ViewBag.ten = HttpContext.Session.GetString("username");
            
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Index(String Username, String Password)
        {
            if (Username == null || Password == null)
            {
                ViewBag.ErrorMsg = "Login failed!";
                return View();
            }
            var account = _context.Accounts
               .FirstOrDefault(m => m.Username == Username && m.Password == Password);
            if (account == null)
            {
                HttpContext.Session.Remove("isLogin");
                ViewBag.ErrorMsg = "Login failed!";
                return View();

            }
            if(account.IsAdmin == true)
            {
                HttpContext.Session.SetString("isLogin", "true");
                return RedirectToAction(actionName: "index", controllerName: "HomeAdmin");

            }
            if (account.IsAdmin == false)
            {
                HttpContext.Session.SetString("isLogin", "true");
                HttpContext.Session.SetString("id", account.Id.ToString());
                HttpContext.Session.SetString("username", Username);
                return RedirectToAction(actionName: "index", controllerName: "Home");
            }
            return RedirectToAction(actionName: "index", controllerName: "Home");
        }
        // GET: Accounts/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Accounts == null)
            {
                return NotFound();
            }

            var account = await _context.Accounts
                .FirstOrDefaultAsync(m => m.Id == id);
            if (account == null)
            {
                return NotFound();
            }

            return View(account);
        }

        // GET: Accounts/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Accounts/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Username,Password,Email,Phone,Address,FullName,IsAdmin,Avatar,ImageFile,Status")] Account account)
        {
                account.IsAdmin = false;
                _context.Add(account);
                await _context.SaveChangesAsync();
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
                    _context.Accounts.Update(account);
                    _context.SaveChanges();
                }
                return RedirectToAction(nameof(Index));
            
         
        }

        // GET: Accounts/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Accounts == null)
            {
                return NotFound();
            }

            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            return View(account);
        }

        // POST: Accounts/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Username,Password,Email,Phone,Address,FullName,IsAdmin,Avatar,Status")] Account account)
        {
            if (id != account.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(account);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AccountExists(account.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return RedirectToAction(actionName:"Details",controllerName:"Accounts") ;
        }

        // GET: Accounts/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Accounts == null)
            {
                return NotFound();
            }

            var account = await _context.Accounts
                .FirstOrDefaultAsync(m => m.Id == id);
            if (account == null)
            {
                return NotFound();
            }

            return View(account);
        }

        // POST: Accounts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Accounts == null)
            {
                return Problem("Entity set 'EshopContex.Accounts'  is null.");
            }
            var account = await _context.Accounts.FindAsync(id);
            if (account != null)
            {
                _context.Accounts.Remove(account);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool AccountExists(int id)
        {
          return _context.Accounts.Any(e => e.Id == id);
        }
    }
}
