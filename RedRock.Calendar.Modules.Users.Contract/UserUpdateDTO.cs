using System;
using System.Collections.Generic;
using System.Text;

namespace RedRock.Calendar.Modules.Users.Contract
{
    public class UserUpdateDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
    }
}
