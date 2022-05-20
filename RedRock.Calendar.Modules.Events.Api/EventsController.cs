using Microsoft.AspNetCore.Mvc;
using RedRock.Calendar.Modules.Events.Contract;
using RedRock.Calendar.Modules.Events.Service;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RedRock.Calendar.Modules.Events.Api
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly IEventService eventService;

        public EventsController(IEventService eventService)
        {
            this.eventService = eventService;
        }

        [HttpGet("{userReference}")]
        public async Task<ActionResult<EventDTO>> Get(Guid userReference, DateTime date)
        {
            var result = await eventService.GetEvent(userReference, date);
            return (result == null) ? NotFound() : Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<EventDTO>> Post(EventDTO newEvent)
        {
            var result = await this.eventService.AddEvent(newEvent);
            return CreatedAtAction(nameof(Get), new { userReference = result.UserReference, date = result.StartDate }, result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventDTO>>> GetAll()
        {
            var result = await this.eventService.GetEvents();
            return Ok(result);
        }

        [HttpGet("interval")]
        public async Task<ActionResult<IEnumerable<EventDTO>>> GetInterval(DateTime startDate, DateTime endDate)
        {
            var result = await this.eventService.GetIntervalAsync(startDate, endDate);
            return Ok(result);
        }
    }
}
