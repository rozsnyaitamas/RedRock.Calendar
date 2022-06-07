using RedRock.Calendar.Modules.Events.Contract;
using RedRock.Calendar.Modules.Finance.Business.PaymentStrategy;
using System.Collections.Generic;
using System.Linq;

namespace RedRock.Calendar.Modules.Finance.Business
{
    public class FinanceBusinessLogic : IFinanceBusinessLogic
    {
        public int CalculateMonthlyFee(IEnumerable<EventDTO> events, IPaymentStrategy paymentStrategy)
        {
            return events.Count() * paymentStrategy.GetPrice();
        }
    }
}
