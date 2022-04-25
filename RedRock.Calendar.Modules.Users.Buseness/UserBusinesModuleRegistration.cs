using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;

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
            var connectionString = configuration["PostgreSql:ConnectionString"];
            var dbPassword = configuration["PostgreSql:DbPassword"];
            var builder = new NpgsqlConnectionStringBuilder(connectionString)
            {
                Password = dbPassword
            };
            services.AddDbContext<UserContext>(options => options.UseNpgsql(builder.ConnectionString));
        }
    }
}
