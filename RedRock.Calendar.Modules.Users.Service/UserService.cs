using AutoMapper;
using RedRock.Calendar.Modules.Users.Buseness;
using RedRock.Calendar.Modules.Users.Contract;
using System;
using System.Collections.Generic;
using System.Text;

namespace RedRock.Calendar.Modules.Users.Service
{
    public class UserService: IUserService
    {
        private readonly IUserDatabase db;
        private readonly IMapper _mapper;

        public UserService(IUserDatabase userDb, IMapper mapper)
        {
            //db = new InMemoryDatabase();
            this.db = userDb;
            _mapper = mapper;
        }

        public List<UserDTO> GetUsers()
        {
            var users = db.GetUsers();
            var result = new List<UserDTO>();
            foreach (User user in users)
            {
                result.Add(_mapper.Map<UserDTO>(user));
            }
            return result;
        }
        public UserDTO GetUserById(Guid id)
        {
            var result = db.GetUserById(id);
            
            return result == null ? null : _mapper.Map<UserDTO>(result);
        }
    }
}
