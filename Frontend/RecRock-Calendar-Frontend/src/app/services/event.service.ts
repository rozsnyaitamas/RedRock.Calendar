import { Injectable } from '@angular/core';
import { EventDTO} from '@redrock/generated-clients/clients';
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
}
