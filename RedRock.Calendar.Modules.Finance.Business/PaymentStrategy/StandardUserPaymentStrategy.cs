
namespace RedRock.Calendar.Modules.Finance.Business.PaymentStrategy
{
    public class StandardUserPaymentStrategy : IPaymentStrategy
    {

        private readonly int price = 20;
        public int GetPrice()
        {
            return price;
        }
    }
}
