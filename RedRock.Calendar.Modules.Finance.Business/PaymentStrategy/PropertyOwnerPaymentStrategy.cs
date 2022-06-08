
namespace RedRock.Calendar.Modules.Finance.Business.PaymentStrategy
{
    public class PropertyOwnerPaymentStrategy : IPaymentStrategy
    {
        private readonly int price = 10;
        public int GetPrice()
        {
            return price;
        }
    }
}
