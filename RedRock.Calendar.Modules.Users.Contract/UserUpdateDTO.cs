﻿using System;

namespace RedRock.Calendar.Modules.Users.Contract
{
    public class UserUpdateDTO
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Password { get; set; }
    }
}
