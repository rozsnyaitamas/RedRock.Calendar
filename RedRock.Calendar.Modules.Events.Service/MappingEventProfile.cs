using AutoMapper;
using RedRock.Calendar.Modules.Events.Business;
using RedRock.Calendar.Modules.Events.Contract;


namespace RedRock.Calendar.Modules.Events.Service
{
    public class MappingEventProfile : Profile
    {
        public MappingEventProfile()
        {
            CreateMap<Event, EventDTO>();
            CreateMap<EventDTO, Event>();
        }
    }
}
