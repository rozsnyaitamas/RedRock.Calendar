export class PopupDTO {
  constructor(
    public name: string,
    public startTime: string,
    public endTime: string,
    public date: Date,
    public eventExists: boolean,
    public noModification: boolean,
    public saveEvent: boolean,
    public deleteEvent: boolean
  ) {}

  public static formatTime(time: Date): string {
    return time.getHours() + ':' + time.getMinutes();
  }
}
