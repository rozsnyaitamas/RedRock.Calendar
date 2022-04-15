using System;

namespace RedRock.Calendar.Modules.Users.Buseness
{
    public class User
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Password { get; set; }
        public string Color { get; set; }

    }
}
