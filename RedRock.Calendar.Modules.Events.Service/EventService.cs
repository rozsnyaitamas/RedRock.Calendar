﻿using RedRock.Calendar.Modules.Events.Contract;
using RedRock.Calendar.Modules.Events.Business;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;

namespace RedRock.Calendar.Modules.Events.Service
{
    class EventService : IEventService
    {
        private readonly IEventRepository eventRepository;
        private readonly IMapper mapper;

        public EventService(IMapper mapper, IEventRepository eventRepository)
        {
            this.eventRepository = eventRepository;
            this.mapper = mapper;
        }
        public async Task<EventDTO> AddEvent(EventDTO newEventDTO)
        {            
            var newEvent = mapper.Map<Event>(newEventDTO);
            return  mapper.Map<EventDTO>(await eventRepository.PostEventAsync(newEvent));
        }

        public async Task<EventDTO> GetEvent(Guid userReference, DateTime date)
        {
            var result = await eventRepository.GetEventAsync(userReference, date);

            return result == null ? null : mapper.Map<EventDTO>(result);
        }

        public async Task<IEnumerable<EventDTO>> GetEvents()
        {
            var result = await eventRepository.GetEventsAsync();
            return (IEnumerable<EventDTO>)(result == null ? null : mapper.Map<EventDTO[]>(result));
        }
    }
}