using System;
using System.ComponentModel.DataAnnotations;

namespace RedRock.Calendar.Modules.Users.Contract
{
    public class UserUpdateDTO
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string PrimaryColor { get; set; }
        public string SecondaryColor { get; set; }
        [Range(0, 1,
        ErrorMessage = "UserRole must have the value of 0 or 1")]
        public UserRole Role { get; set; }
    }
}
