using AutoMapper;
using RedRock.Calendar.Modules.Users.Buseness;
using RedRock.Calendar.Modules.Users.Contract;

namespace RedRock.Calendar.Modules.Users.Service
{
    public class MappingUserProfile : Profile
    {
        public MappingUserProfile()
        {
            CreateMap<User, UserDTO>();
            CreateMap<User, UserUpdateDTO>();
            CreateMap<UserDTO, User>();
        }
    }
}
