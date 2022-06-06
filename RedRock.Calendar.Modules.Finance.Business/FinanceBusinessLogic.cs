using RedRock.Calendar.Modules.Events.Contract;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RedRock.Calendar.Modules.Finance.Business
{
    public class FinanceBusinessLogic : IFinanceBusinessLogic
    {
        public int CalculateMonthlyFee(IEnumerable<EventDTO> events)
        {
            return events.Count() * 20;
        }
    }
}
