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
                IPaymentStrategy paymentStrategy;
                switch (userRole)
                {
                    case UserRole.PropertyOwner:
                        {
                            paymentStrategy = new PropertyOwnerPaymentStrategy();
                            break;
                        }
                    case UserRole.StandardUser:
                        {
                            paymentStrategy = new StandardUserPaymentStrategy();
                            break;
                        }
                    case UserRole.SupporterUser:
                        {
                            paymentStrategy = new SupporterUserPaymentStrategy();
                            break;
                        }
                    default:
                        {
                            paymentStrategy = new StandardUserPaymentStrategy(); //TODO implement in case of default!!
                            break;
                        }
                }
                var result = financeLogic.CalculateMonthlyFee(events, paymentStrategy);
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
