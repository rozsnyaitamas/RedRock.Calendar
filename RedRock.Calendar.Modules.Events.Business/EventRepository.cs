using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RedRock.Calendar.Modules.Events.Business
{
    class EventRepository : IEventRepository
    {
        private readonly DbSet<Event> events;
        private readonly EventContext context;

        public EventRepository(EventContext context)
        {
            events = context.Events;
            this.context = context;
        }

        public async Task<Event> GetEventAsync(Guid userReference, DateTime date)
        {
            var result = await events.ToListAsync();
            foreach( var e in result)
            {
                if (e.UserReference.Equals(userReference) && e.StartDate.Equals(date))
                {
                    return e;
                }
            }

            return null;
        }

        public async Task<Event> PostEventAsync(Event newEvent)
        {
            var result = events.Add(newEvent);
            int v = await context.SaveChangesAsync();
            if (v != 0)
            {
                return result.Entity;
            }
            return null;
        }

        public async Task<IEnumerable<Event>> GetEventsAsync()
        {
            return await events.ToListAsync();
        }
    }
}
