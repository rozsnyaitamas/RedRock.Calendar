using FluentValidation.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RedRock.Calendar.Modules.Users.Contract;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RedRock.Calendar.Modules.Users.Api
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService userService;

        public UsersController(IUserService userService)
        {
            this.userService = userService;
        }


        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> Get()
        {
            var result = await userService.GetUsers();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetById(string id)
        {
            var result = await userService.GetUserById(new Guid(id));

            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPut("{id}/changePassword")]
        public async Task<ActionResult<UserDTO>> ChangePassword(Guid id, UserChangePasswordDTO passwords)
        {
            UserChangePasswordDTOValidator validator = new UserChangePasswordDTOValidator();

            ValidationResult validationResult = validator.Validate(passwords);
            if (validationResult.IsValid)
            {

                var result = await userService.ChangePassword(id, passwords);
                if (result == null)
                {
                    return BadRequest();
                }
                return NoContent();
            }
            else
            {
                var errors = new List<string>();
                foreach (ValidationFailure failer in validationResult.Errors)
                {
                    errors.Add(failer.ErrorMessage);
                }
                return Unauthorized(errors);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<UserDTO>> Update(Guid id, UserUpdateDTO userDTO)
        {
            var result = await userService.Update(id, userDTO);

            if (result == null)
            {
                return NotFound();
            }
            return NoContent();
        }


        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login([FromBody] UserLoginDTO userParam)
        {
            UserLoginDTOValidator validator = new UserLoginDTOValidator();

            ValidationResult validationResult = validator.Validate(userParam);

            if (validationResult.IsValid)
            {
                var result = await userService.Login(userParam.UserName, userParam.Password);
                if (result == null)
                {
                    return Unauthorized();
                }
                return Ok(result);
            }
            else
            {
                var errors = new List<string>();
                foreach (ValidationFailure failer in validationResult.Errors)
                {
                    errors.Add(failer.ErrorMessage);
                }
                return Unauthorized(errors);
            }

        }
    }
}
