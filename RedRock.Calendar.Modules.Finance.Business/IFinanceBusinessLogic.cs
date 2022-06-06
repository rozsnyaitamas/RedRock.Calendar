using RedRock.Calendar.Modules.Events.Contract;
using System;
using System.Collections.Generic;
using System.Text;

namespace RedRock.Calendar.Modules.Finance.Business
{
    public interface IFinanceBusinessLogic
    {
        public int CalculateMonthlyFee(IEnumerable<EventDTO> events);
    }
}
