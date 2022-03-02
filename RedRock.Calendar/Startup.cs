using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RedRock.Calendar.Modules.Users.Api;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using RedRock.Calendar.Modules.Users.Buseness;
using RedRock.Calendar.Modules.Users.Service;
using AutoMapper;

namespace RedRock.Calendar
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            var assembly = typeof(UsersController).Assembly;
            services.AddControllers().PartManager.ApplicationParts.Add(new AssemblyPart(assembly));

            services.AddCors(options => {
                options.AddPolicy(name: "*",
                    builder => {
                        builder.WithOrigins("*")
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials();
                    });
            });

            services.AddBusinesServiceModule(); //rename
            services.AddServiceModule();


            //services.AddOpenApiDocument(configure =>
            //{
            //    configure.Title = "RedRock Calendar Api";
            //    configure.DefaultReferenceTypeNullHandling = NJsonSchema.Generation.ReferenceTypeNullHandling.NotNull;
            //    configure.DefaultResponseReferenceTypeNullHandling = NJsonSchema.Generation.ReferenceTypeNullHandling.NotNull;
            //    configure.RequireParametersWithoutDefault = true;
            //    configure.SchemaType = NJsonSchema.SchemaType.Swagger2;
            //});

            services.AddSwaggerDocument(configure => configure.Title = "RedRock Calendar Api");

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseOpenApi();
            app.UseSwaggerUi3();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
