using System;

namespace RedRock.Calendar.Modules.Events.Contract
{
  public class EventDTO
  {
    public Guid Id { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public Guid UserReference { get; set; }
  }
}
