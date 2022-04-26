
using Microsoft.Extensions.DependencyInjection;

namespace RedRock.Calendar.Modules.Events.Service
{
    public static class EventServiceModuleRegistration
    {
        public static void AddEventServiceModule(this IServiceCollection services)
        {
            services.AddTransient<IEventService, EventService>();
            
            //Configuring Mapper Profile for Events 
            services.AddAutoMapper(typeof(EventServiceModuleRegistration));
        }
    }
}
