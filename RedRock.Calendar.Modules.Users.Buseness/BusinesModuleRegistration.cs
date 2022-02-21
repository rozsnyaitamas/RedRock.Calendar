using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace RedRock.Calendar.Modules.Users.Buseness
{
    public static class BusinesModuleRegistration
    {
        public static void AddBusinesServiceModule(this IServiceCollection services)
        {
            services.AddSingleton<IUserDatabase, InMemoryDatabase>();
        }
    }
}
