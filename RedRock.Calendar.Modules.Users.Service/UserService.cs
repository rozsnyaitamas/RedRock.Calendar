using AutoMapper;
using RedRock.Calendar.Modules.Users.Buseness;
using RedRock.Calendar.Modules.Users.Contract;
using System;
using System.Collections.Generic;

namespace RedRock.Calendar.Modules.Users.Service
{
    public class UserService: IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly IMapper _mapper;

        public UserService(IMapper mapper, IUserRepository userRepository)
        {
            this.userRepository = userRepository;
            _mapper = mapper;
        }

        public IEnumerable<UserDTO> GetUsers()
        {
            var users = userRepository.GetUsersAsync().Result;

            var result = new List<UserDTO>();
            foreach (User user in users)
            {
                result.Add(_mapper.Map<UserDTO>(user));
            }
            return result;
        }
        public UserDTO GetUserById(Guid id)
        {
            var result = userRepository.GetUserByIdAsync(id).Result;
            
            return result == null ? null : _mapper.Map<UserDTO>(result);
        }
    }
}
