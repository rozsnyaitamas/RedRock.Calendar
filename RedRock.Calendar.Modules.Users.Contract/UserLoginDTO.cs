
using System.ComponentModel.DataAnnotations;

namespace RedRock.Calendar.Modules.Users.Contract
{
    public class UserLoginDTO
    {
        [Required()]
        public string UserName { get; set; }
        [Required()]
        public string Password { get; set; }
    }
}
