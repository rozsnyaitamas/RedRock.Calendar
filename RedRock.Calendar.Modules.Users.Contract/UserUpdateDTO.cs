using System;

namespace RedRock.Calendar.Modules.Users.Contract
{
    public class UserUpdateDTO
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string PrimaryColor { get; set; }
        public string SecondaryColor { get; set; }
        public UserRole Role { get; set; }
    }
}
