using System;

namespace RedRock.Calendar.Modules.Events.Contract
{
    public class EventPostDTO
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid UserReference { get; set; }
    }
}
