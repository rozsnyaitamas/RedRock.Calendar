using Microsoft.EntityFrameworkCore;

namespace RedRock.Calendar.Modules.Events.Business
{
    class EventContext : DbContext
    {
        public EventContext(DbContextOptions<EventContext> options)
                : base(options)
        { }

        public DbSet<Event> Events { get; set; }
    }
}
