using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;
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
            services.AddScoped<IUserRepository, UserRepository>();
        }

        public static void AddDatabase(this IServiceCollection services, IConfiguration configuration)
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
