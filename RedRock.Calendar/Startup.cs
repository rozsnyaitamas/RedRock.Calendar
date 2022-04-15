using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RedRock.Calendar.Modules.Users.Api;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using RedRock.Calendar.Modules.Users.Buseness;
using RedRock.Calendar.Modules.Users.Service;

namespace RedRock.Calendar
{
    public class Startup
    {
        private readonly string policyName = "RedRockPolicy";

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

            //===================================Setting up CORS=======================================
            services.AddCors(options =>
            {
                options.AddPolicy(name: this.policyName,
                                  policy =>
                                  {
                                      policy.AllowAnyOrigin()
                                            .AllowAnyMethod()
                                            .AllowAnyHeader();
                                  });
            });
            //=========================================================================================


            services.AddBusinesServiceModule(); //rename
            services.AddServiceModule();


            services.AddSwaggerDocument(configure => configure.Title = "RedRock Calendar Api");

            services.AddDatabase(Configuration);


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }



            app.UseRouting();

            app.UseCors(this.policyName);   //Comes after UseRouting() and before UseHttpsRedirection(), UseAuthorization()

            app.UseHttpsRedirection();
            app.UseAuthorization();


            app.UseOpenApi();
            app.UseSwaggerUi3();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }
    }
}
