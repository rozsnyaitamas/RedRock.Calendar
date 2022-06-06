using RedRock.Calendar.Modules.Events.Contract;
using RedRock.Calendar.Modules.Finance.Business;
using RedRock.Calendar.Modules.Finance.Contract;
using System;
using System.Threading.Tasks;

namespace RedRock.Calendar.Modules.Finance.Service
{
    public class FinanceService : IFinanceService
    {
        private readonly IFinanceBusinessLogic financeLogic;
        private readonly IEventService eventService;

        public FinanceService(IFinanceBusinessLogic financeLogic, IEventService eventService)
        {
            this.financeLogic = financeLogic;
            this.eventService = eventService;
        }

        public async Task<FinanceDTO> GetMonthlyFee(Guid userReference, DateTime start, DateTime end)
        {
            var events = await eventService.GetIntervalWithUserRefAsync(userReference, start, end);
            if (events != null)
            {
                var result = financeLogic.CalculateMonthlyFee(events);
                var financeDTO = new FinanceDTO
                {
                    UserReference = userReference,
                    Sum = result,
                    Month = start.Month
                };
                return financeDTO;

            }
            return null;
        }
    }
}
