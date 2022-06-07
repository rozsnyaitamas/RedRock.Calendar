using System;
using RedRock.Calendar.Modules.Users.Contract;

namespace RedRock.Calendar.Modules.Users.Buseness
{
    public class User
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Password { get; set; }
        public string PrimaryColor { get; set; }
        public string SecondaryColor { get; set; }
        public UserRole Role { get; set; }

    }
}
