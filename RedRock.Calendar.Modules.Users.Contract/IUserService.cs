using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RedRock.Calendar.Modules.Users.Contract
{
    public interface IUserService
    {
        public Task<IEnumerable<UserDTO>> GetUsers();
        public Task<UserDTO> GetUserById(Guid id);
        public Task<UserDTO> Login(string username, string password);
        public Task<UserDTO> Update(Guid id, UserUpdateDTO userDTO);
        public Task<UserDTO> ChangePassword(Guid id, UserChangePasswordDTO password);
        public Task<UserRole> GetUserRole(Guid id);
    }
}
