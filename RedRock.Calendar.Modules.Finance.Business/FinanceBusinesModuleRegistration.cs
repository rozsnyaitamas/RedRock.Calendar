using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace RedRock.Calendar.Modules.Finance.Business
{
    public static class FinanceBusinesModuleRegistration
    {
        public static void AddFinanceBusinesModule(this IServiceCollection services)
        {
            services.AddScoped<IFinanceBusinessLogic, FinanceBusinessLogic>();
        }
    }
}
