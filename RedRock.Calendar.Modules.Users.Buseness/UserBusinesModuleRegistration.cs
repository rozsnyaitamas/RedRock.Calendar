using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RedRock.Calendar.Modules.Users.Buseness.Settings;

namespace RedRock.Calendar.Modules.Users.Buseness
{
    public static class UserBusinesModuleRegistration
    {
        public static void AddUserBusinesModule(this IServiceCollection services)
        {
            services.AddSingleton<IUserDatabase, InMemoryDatabase>();
            services.AddScoped<IUserRepository, UserRepository>();
        }

        public static void AddUserDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<UserContext>(options => options.UseNpgsql(configuration.GetConnectionString(nameof(UserContextConnection))));
        }
    }
}
