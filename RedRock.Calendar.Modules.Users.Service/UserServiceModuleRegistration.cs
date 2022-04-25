using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

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
