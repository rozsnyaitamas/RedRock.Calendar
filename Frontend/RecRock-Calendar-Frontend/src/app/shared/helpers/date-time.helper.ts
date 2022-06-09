import { lastDayOfMonth } from "date-fns";

export class DateTimeHelper {
  public static formatTime(time: Date): string {
    return time.getHours() + ':' + time.getMinutes();
  }

  public static addTimeToDate(time: string, date: Date): Date {
    let decomposed_time: string[] = time.split(':');
    let hour: number = parseInt(decomposed_time[0]);
    let minute: number = parseInt(decomposed_time[1]);
    let newDate: Date = new Date(date);
    newDate.setHours(hour, minute, 0, 0);
    return newDate;
  }

  public static isTimeSwitched(startTime: string, endTime: string): boolean {
    return startTime > endTime;
  }

  public static firstDayOfThisMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  public static lastDayOfThisMonth(date: Date): Date {
    return lastDayOfMonth(date);
  }
}
