using Eshop.Models;
using Microsoft.EntityFrameworkCore;

namespace doanTest.Data
{
    public class EshopContex: DbContext
    {
        public EshopContex(DbContextOptions<EshopContex> options)
: base(options)
        { }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Cart> carts { get; set; }
        public DbSet<Invoice>invoices { get; set; }
        public DbSet<InvoiceDetail>InvoiceDetails { get; set; }
        public DbSet<Product> products { get; set; }
        public DbSet<ProductType> productTypes { get; set; }
        public IEnumerable<object> Cart { get; internal set; }
    }
}
