using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RedRock.Calendar.Modules.Events.Business
{
    class EventRepository : IEventRepository
    {
        private readonly EventContext context;

        public EventRepository(EventContext context)
        {
            this.context = context;
        }

        public async Task<Event> GetEventAsync(Guid userReference, DateTime date)
        {
            return await context.Events.FirstOrDefaultAsync<Event>(e => e.UserReference.Equals(userReference) && e.StartDate.Equals(date));
        }

        public async Task<Event> PostEventAsync(Event newEvent)
        {
            var result = context.Events.Add(newEvent);
            await context.SaveChangesAsync();
            return result?.Entity;
        }

        public async Task<IEnumerable<Event>> GetEventsAsync()
        {
            return await context.Events.ToListAsync();
        }

        public async Task<IEnumerable<Event>> GetIntervalAsync(DateTime start, DateTime end)
        {
            return await context.Events.Where(e => (e.StartDate.CompareTo(start) >= 0) && (e.StartDate.CompareTo(end) <= 0)).ToListAsync<Event>();
        }

        public void DeleteEvent(Guid eventId)
        {
            var result = context.Events.FirstOrDefault<Event>(e => e.Id.Equals(eventId));
            if (result != null)
            {
                context.Events.Remove(result);
                context.SaveChanges();
            }
            else
            {
                throw new KeyNotFoundException();
            }
        }

        public async Task<IEnumerable<Event>> GetIntervalWithUserRefAsync(Guid userReference, DateTime start, DateTime end)
        {
            return await context.Events
                .Where(e => (e.StartDate.CompareTo(start) >= 0) && (e.StartDate.CompareTo(end) <= 0) && (e.UserReference.Equals(userReference)))
                .ToListAsync<Event>();
        }
    }
}
