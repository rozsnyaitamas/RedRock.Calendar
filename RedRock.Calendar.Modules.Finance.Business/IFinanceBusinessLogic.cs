using RedRock.Calendar.Modules.Events.Contract;
using RedRock.Calendar.Modules.Finance.Business.PaymentStrategy;
using System.Collections.Generic;

namespace RedRock.Calendar.Modules.Finance.Business
{
    public interface IFinanceBusinessLogic
    {
        public int CalculateMonthlyFee(IEnumerable<EventDTO> events, IPaymentStrategy paymentStrategy);
    }
}
