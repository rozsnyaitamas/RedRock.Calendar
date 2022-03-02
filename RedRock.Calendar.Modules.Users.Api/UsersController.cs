﻿using Microsoft.AspNetCore.Mvc;
using RedRock.Calendar.Modules.Users.Service;
using System;

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
        public IActionResult Get()
        {
            
            return Ok(userService.GetUsers());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var result = userService.GetUserById(new Guid(id));

            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}
