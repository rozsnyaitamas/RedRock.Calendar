using AutoMapper;
using RedRock.Calendar.Common.HassingHelpers;
using RedRock.Calendar.Modules.Users.Buseness;
using RedRock.Calendar.Modules.Users.Contract;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RedRock.Calendar.Modules.Users.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly IMapper _mapper;

        public UserService(IMapper mapper, IUserRepository userRepository)
        {
            this.userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserDTO>> GetUsers()
        {
            var users = await userRepository.GetUsersAsync();
            var result = _mapper.Map<UserDTO[]>(users);

            return result;
        }
        public async Task<UserDTO> GetUserById(Guid id)
        {
            var result = await userRepository.GetUserByIdAsync(id);

            return result == null ? null : _mapper.Map<UserDTO>(result);
        }

        public async Task<UserDTO> Login(string username, string password)
        {
            var result = await userRepository.GetUserByUsernameAsync(username);
            if (result == null || !SHA256.Check(result.Password, password))
            {
                return null;
            }
            return _mapper.Map<UserDTO>(result);
        }

        public async Task<UserDTO> Update(Guid id, UserUpdateDTO userDTO)
        {
            var user = _mapper.Map<User>(userDTO);
            var result = await userRepository.UpdateUserAsync(id, user);
            return result == null ? null : _mapper.Map<UserDTO>(result);
        }

        public async Task<UserDTO> ChangePassword(Guid id, UserChangePasswordDTO password)
        {
            var check = await userRepository.GetUserByIdAsync(id);
            if (check == null || !SHA256.Check(check.Password, password.Password) || !password.NewPassword.Equals(password.NewPasswordRepeat))
            {
                return null;
            }
            else
            {
                var result = await userRepository.ChangePasswordAsync(id, SHA256.Hash(password.NewPassword));
                return result == null ? null : _mapper.Map<UserDTO>(result);
            }
        }

        public async Task<UserRole> GetUserRole(Guid id)
        {
            return await userRepository.GetRole(id);
        }
    }
}
