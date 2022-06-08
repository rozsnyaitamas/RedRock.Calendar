using System;
using System.ComponentModel.DataAnnotations;

namespace RedRock.Calendar.Modules.Users.Contract
{
    public class UserDTO
    {
        [Required()]
        public Guid Id { get; set; }
        [Required()]
        public string FullName { get; set; }
        [Required()]
        public string UserName { get; set; }
        [Required()]
        public string PrimaryColor { get; set; }
        [Required()]
        public string SecondaryColor { get; set; }
        [Required()]
        public UserRole Role { get; set; }
    }
}
