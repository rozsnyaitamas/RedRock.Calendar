using Microsoft.Extensions.DependencyInjection;
using RedRock.Calendar.Modules.Finance.Contract;

namespace RedRock.Calendar.Modules.Finance.Service
{
    public static class FinanceServiceModuleRegistration
    {
        public static void AddFinanceServiceModule(this IServiceCollection services)
        {
            services.AddTransient<IFinanceService, FinanceService>();
        }
    }
}
