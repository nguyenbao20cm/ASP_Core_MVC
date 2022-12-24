using doanTest.Data;
using Eshop.Interfaces;
using Eshop.Models;
using Microsoft.EntityFrameworkCore;

namespace Eshop.Services
{
    public class ProductsService : IProductsService
    {
        private EshopContex _context;
        public ProductsService(EshopContex context)
        {
            _context = context;
        }

        public Product CreateProduct(ProductViewModel input)
        {
            var output = new Product()
            {
                SKU = input.SKU,
                Name = input.Name,
                Description = input.Description,
                Price = input.Price,
                Stock = input.Stock,
                ProductTypeId = input.ProductTypeId,
                ProductType = input.ProductType,
                Status = true,
                Carts = new List<Cart>(),
                InvoiceDetails = new List<InvoiceDetail>()
            };
            _context.products.Add(output);
            _context.SaveChanges();
            return output;
        }

        public Product CreateProduct(Product product)
        {
            throw new NotImplementedException();
        }

        public Product DeleteProduct(int id)
        {
            var product = _context.products.Where(x => x.Id == id).FirstOrDefault();
            var carts = _context.carts.Where(c => c.AccountId == id).ToList();
            var invoicesDetails = _context.InvoiceDetails.Where(i => i.InvoiceId == id).ToList();

            _context.RemoveRange(product);
            _context.RemoveRange(carts);
            _context.RemoveRange(invoicesDetails);
            _context.SaveChanges();
            return product;
        }

        public List<Product> getAll()
        {
            List<Product> products = new List<Product>();
            products = _context.products.ToList();
            return products;
        }


     
    }
}
