using RedRock.Calendar.Modules.Users.Buseness;
using RedRock.Calendar.Modules.Users.Contract;
using System;
using System.Collections.Generic;
using System.Text;

namespace RedRock.Calendar.Modules.Users.Service
{
    public interface IUserService
    {
        public IEnumerable<UserDTO> GetUsers();
        public UserDTO GetUserById(Guid id);
    }
}
