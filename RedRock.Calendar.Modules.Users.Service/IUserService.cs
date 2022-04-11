using RedRock.Calendar.Modules.Users.Contract;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RedRock.Calendar.Modules.Users.Service
{
    public interface IUserService
    {
        public Task<IEnumerable<UserDTO>> GetUsers();
        public Task<UserDTO> GetUserById(Guid id);
    }
}
