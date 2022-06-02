
namespace RedRock.Calendar.Modules.Users.Contract
{
    public class UserChangePasswordDTO
    {
        public string Password { get; set; }
        public string NewPassword { get; set; }
        public string NewPasswordRepeat { get; set; }
    }
}
