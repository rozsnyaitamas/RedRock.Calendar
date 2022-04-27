using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RedRock.Calendar.Modules.Events.Business.Settings;

namespace RedRock.Calendar.Modules.Events.Business
{
    public static class EventBusinesModuleRegistration
    {
        public static void AddEventBusinesModule(this IServiceCollection services)
        {
            services.AddScoped<IEventRepository, EventRepository>();
        }

        public static void AddEventDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<EventContext>(options => options.UseNpgsql(configuration.GetConnectionString(nameof(EventContextConnection))));
        }
    }
}
