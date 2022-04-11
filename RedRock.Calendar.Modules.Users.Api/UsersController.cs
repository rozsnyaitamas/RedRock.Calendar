using Microsoft.AspNetCore.Mvc;
using RedRock.Calendar.Modules.Users.Service;
using System;
using System.Threading.Tasks;

namespace RedRock.Calendar.Modules.Users.Api
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService userService;

        public UsersController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await userService.GetUsers();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var result = await userService.GetUserById(new Guid(id));

            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}
