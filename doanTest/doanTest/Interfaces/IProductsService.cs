using Eshop.Models;

namespace Eshop.Interfaces
{
    public interface IProductsService
    {
        List<Product> getAll();
        Product DeleteProduct(int id);
        Product CreateProduct(Product product);

    }
}
