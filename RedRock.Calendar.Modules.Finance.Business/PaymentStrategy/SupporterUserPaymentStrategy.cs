
namespace RedRock.Calendar.Modules.Finance.Business.PaymentStrategy
{
    public class SupporterUserPaymentStrategy : IPaymentStrategy
    {
        private readonly int price = 30;
        public int GetPrice()
        {
            return price;
        }
    }
}
