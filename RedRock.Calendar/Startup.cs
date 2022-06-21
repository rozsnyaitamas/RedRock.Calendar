using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RedRock.Calendar.Modules.Users.Api;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using RedRock.Calendar.Modules.Users.Buseness;
using RedRock.Calendar.Modules.Users.Service;
using RedRock.Calendar.Modules.Events.Business;
using RedRock.Calendar.Modules.Events.Service;
using Microsoft.AspNetCore.Authentication;
using RedRock.Calendar.Modules.Finance.Business;
using RedRock.Calendar.Modules.Finance.Service;
using DinkToPdf.Contracts;
using DinkToPdf;

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

            services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));

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

            //----------Configure basic authentication----------
            services.AddAuthentication("BasicAuthentication")
                .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", null);
            //--------------------------------------------------

            services.AddUserBusinesModule();
            services.AddEventBusinesModule();
            services.AddFinanceBusinesModule();

            services.AddUserServiceModule();
            services.AddEventServiceModule();
            services.AddFinanceServiceModule();


            services.AddSwaggerDocument(configure => configure.Title = "RedRock Calendar Api");

            services.AddUserDatabase(Configuration);
            services.AddEventDatabase(Configuration);


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
            app.UseAuthentication();
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
