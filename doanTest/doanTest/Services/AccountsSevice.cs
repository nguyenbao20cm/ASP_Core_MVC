using doanTest.Data;
using doanTest.Interfaces;
using Eshop.Models;

namespace Eshop.Services
{
    public class AccountsSevice : IAccountService
    {
        private EshopContex _context;
        public AccountsSevice(EshopContex context)
        {
            _context = context;
        }

        public Account CreateMember(AccountViewModel input)
        {
            var output = new Account()
            {
                Username = input.Username,
                Password = input.Password,
                Email = input.Email,
                Phone = input.Phone,
                Address = input.Address,
                FullName = input.FullName,
                Avatar = input.Avatar,
                IsAdmin = false,
                Status = true,
                Carts = new List<Cart>(),
                Invoices = new List<Invoice>(),
            };
            _context.Accounts.Add(output);
            _context.SaveChanges();
            return output;
        }

        public Account EditMember(AccountViewModel input, int id,string password)
        {
            var output = new Account()
            {
                Id = id,
                Username = input.Username,
                Password = password,
                Email = input.Email,
                Phone = input.Phone,
                Address = input.Address,
                FullName = input.FullName,
                IsAdmin = false,
                Avatar = "",
                Status = true,
                Carts = new List<Cart>(),
                Invoices = new List<Invoice>(),
            };
            _context.Accounts.Update(output);
            _context.SaveChanges();
            return output;
        }

        public Account DeleteMember(int id)
        {
            var account = _context.Accounts.Where(x => x.Id == id).FirstOrDefault();
            var carts = _context.carts.Where(c => c.AccountId == id).ToList();
            var invoices = _context.invoices.Where(i => i.AccountId == id).ToList();
            var invoicesDetails = _context.InvoiceDetails.Where(i => i.InvoiceId == id).ToList();

            _context.RemoveRange(account);
            _context.RemoveRange(carts);
            _context.RemoveRange(invoices);
            _context.RemoveRange(invoicesDetails);   
            _context.SaveChanges();
            return account;
        }

        public List<Account> getAll()
        {
            List<Account> accounts = new List<Account>();
            accounts = _context.Accounts.ToList();
            return accounts;
        }

        public AccountViewModel GetMember(int id)
        {
            AccountViewModel accounts = null;
            var accDb = _context.Accounts.Where(x => x.Id == id).FirstOrDefault();
            accounts = new AccountViewModel
            {
                Id = accDb.Id,
                Username = accDb.Username,
                Password = accDb.Password,
                Email = accDb.Email,
                Phone = accDb.Phone,
                Address = accDb.Address,
                FullName = accDb.FullName,
            };
            return accounts;
        }

        
     
    }
}
