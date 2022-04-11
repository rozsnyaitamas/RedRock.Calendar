using System;

namespace RedRock.Calendar.Modules.Users.Contract
{
    public class UserDTO
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
    }
}
