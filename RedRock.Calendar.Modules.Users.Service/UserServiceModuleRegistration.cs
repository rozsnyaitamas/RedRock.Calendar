using Microsoft.Extensions.DependencyInjection;

namespace RedRock.Calendar.Modules.Users.Service
{
    public static class UserServiceModuleRegistration
    {
        public static void AddUserServiceModule(this IServiceCollection services)
        {
            services.AddTransient<IUserService, UserService>();

            //Configuring Mapper Profile for Users 
            services.AddAutoMapper(typeof(UserServiceModuleRegistration));            
        }
    }
}
