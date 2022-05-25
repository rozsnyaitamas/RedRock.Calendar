using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RedRock.Calendar.Modules.Events.Business
{
    public interface IEventRepository
    {
        public Task<Event> GetEventAsync(Guid userReference, DateTime date);
        public Task<Event> PostEventAsync(Event newEvent);
        public Task<IEnumerable<Event>> GetEventsAsync();
        public Task<IEnumerable<Event>> GetIntervalAsync(DateTime start, DateTime end);
        public void DeleteEvent(Guid eventId);
    }
}
