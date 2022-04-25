using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;

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
            var connectionString = configuration["PostgreSql:ConnectionString"];
            var dbPassword = configuration["PostgreSql:DbPassword"];
            var builder = new NpgsqlConnectionStringBuilder(connectionString)
            {
                Password = dbPassword
            };
            services.AddDbContext<EventContext>(options => options.UseNpgsql(builder.ConnectionString));
        }
    }
}
