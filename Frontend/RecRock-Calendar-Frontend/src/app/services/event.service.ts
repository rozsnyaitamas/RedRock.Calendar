import { Injectable } from '@angular/core';
import { EventDTO, EventPostDTO} from '@redrock/generated-html-client/models'
import { EventsAPIClient } from '@redrock/generated-html-client/services/events';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private readonly api: EventsAPIClient) {}

  public async getByInterval(start: Date, end: Date): Promise<EventDTO[]> {
    return firstValueFrom(this.api.getInterval({
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    }));
  }

  public delete(eventId: string): void {
    this.api.delete({eventId: eventId}).subscribe();
  }

  public async postNewEvent(event: EventPostDTO): Promise<EventDTO> {
    return firstValueFrom(this.api.post({
      newEvent: event
    }));
  }
}
