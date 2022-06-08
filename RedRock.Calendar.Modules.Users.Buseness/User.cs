using System;
using System.ComponentModel.DataAnnotations;
using RedRock.Calendar.Modules.Users.Contract;

namespace RedRock.Calendar.Modules.Users.Buseness
{
    public class User
    {
        [Required()]
        public Guid Id { get; set; }
        [Required()]
        public string UserName { get; set; }
        [Required()]
        public string FullName { get; set; }
        [Required()]
        public string Password { get; set; }
        [Required()]
        public string PrimaryColor { get; set; }
        [Required()]
        public string SecondaryColor { get; set; }
        [Required()]
        public UserRole Role { get; set; }

    }
}
