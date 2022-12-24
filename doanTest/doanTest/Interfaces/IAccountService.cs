using doanTest.Models;
using Eshop.Models;

namespace doanTest.Interfaces
{
    public interface IAccountService
    {
        List<Account> getAll();
        Account DeleteMember(int id);
        Account CreateMember(AccountViewModel account);
        AccountViewModel GetMember(int id);
        Account EditMember(AccountViewModel account,int id,string password);

    }
}
