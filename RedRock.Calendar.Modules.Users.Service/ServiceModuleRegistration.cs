using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace RedRock.Calendar.Modules.Users.Service
{
    public static class ServiceModuleRegistration
    {
        public static void AddServiceModule(this IServiceCollection services)
        {
            services.AddTransient<IUserService, UserService>();

            //Configuring Mapper Profile for Users 
            var mapperConfiguration = new MapperConfiguration(mc =>
                {
                    mc.AddProfile(new MappingUserProfile());
                });
            IMapper mapper = mapperConfiguration.CreateMapper();
            services.AddSingleton(mapper);
        }
    }
}
