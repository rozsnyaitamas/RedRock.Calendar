export class PopupModel {
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
}
