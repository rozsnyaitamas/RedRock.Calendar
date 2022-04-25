using RedRock.Calendar.Modules.Events.Contract;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RedRock.Calendar.Modules.Events.Service
{
    public interface IEventService
    {
        public Task<EventDTO> GetEvent(Guid userReference, DateTime date);
        public Task<EventDTO> AddEvent(EventDTO newEvent);
        public Task<IEnumerable<EventDTO>> GetEvents();
    }
}
