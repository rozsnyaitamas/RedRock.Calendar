using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RedRock.Calendar.Modules.Events.Contract
{
    public interface IEventService
    {
        public Task<EventDTO> GetEvent(Guid userReference, DateTime date);
        public Task<EventDTO> AddEvent(EventPostDTO newEvent);
        public Task<IEnumerable<EventDTO>> GetEvents();
        public Task<IEnumerable<EventDTO>> GetIntervalAsync(DateTime start, DateTime end);
        public Task<IEnumerable<EventDTO>> GetIntervalWithUserRefAsync(Guid userReference, DateTime start, DateTime end);
        public void DeleteEvent(Guid eventId);
    }
}
