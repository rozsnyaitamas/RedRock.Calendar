using AutoMapper;
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
            if (password.Length < 8) return null;
            var result = await userRepository.GetUserByUsernameAsync(username);
            if (result == null || !PasswordHasher.Check(result.Password,password))
            {
                return null;
            }
            return _mapper.Map<UserDTO>(result);
        }
    }
}
