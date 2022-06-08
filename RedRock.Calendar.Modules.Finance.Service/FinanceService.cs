using RedRock.Calendar.Modules.Events.Contract;
using RedRock.Calendar.Modules.Finance.Business;
using RedRock.Calendar.Modules.Finance.Business.PaymentStrategy;
using RedRock.Calendar.Modules.Finance.Contract;
using RedRock.Calendar.Modules.Users.Contract;
using System;
using System.Threading.Tasks;

namespace RedRock.Calendar.Modules.Finance.Service
{
    public class FinanceService : IFinanceService
    {
        private readonly IFinanceBusinessLogic financeLogic;
        private readonly IEventService eventService;
        private readonly IUserService userService;

        public FinanceService(IFinanceBusinessLogic financeLogic, IEventService eventService, IUserService userService)
        {
            this.financeLogic = financeLogic;
            this.eventService = eventService;
            this.userService = userService;
        }

        public async Task<FinanceDTO> GetMonthlyFee(Guid userReference, DateTime start, DateTime end)
        {
            var events = await eventService.GetIntervalWithUserRefAsync(userReference, start, end);
            if (events != null)
            {
                var userRole = await userService.GetUserRole(userReference);
                var result = financeLogic.CalculateMonthlyFee(events, PaymentStrategyFactory.GetPaymentStrategy(userRole));
                                
                return FinanceDTOBuilder(userReference, result, start.Month);

            }
            return null;
        }

        private FinanceDTO FinanceDTOBuilder(Guid userReference, int sum, int month)
        {
            return new FinanceDTO { UserReference = userReference, Sum = sum, Month = month };
        }
    }
}
