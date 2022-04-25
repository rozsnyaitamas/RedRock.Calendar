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

        [HttpGet]
        public async Task<ActionResult<EventDTO>> Get(Guid userReference, DateTime date)
        {
            var result = await this.eventService.GetEvent(userReference, date);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<EventDTO>> Post(EventDTO newEvent)
        {
            var result = await this.eventService.AddEvent(newEvent);
            return Created("", result); // TODO: replace "" with generated URI
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<EventDTO>>> Get()
        {
            var result = await this.eventService.GetEvents();
            return Ok(result);
        }
    }
}
