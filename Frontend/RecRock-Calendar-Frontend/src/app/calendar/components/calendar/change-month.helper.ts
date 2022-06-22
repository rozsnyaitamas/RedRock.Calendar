export class ChangeMonthHelper {
  public static previousMonth(currentDate: Date): Date {
    var newCurrentDate: Date;
    if (currentDate.getMonth() == 0) {
      newCurrentDate = new Date(currentDate.getFullYear() - 1, 11, 1);
    } else {
      newCurrentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      );
    }

    return this.setThisDateIFThisMonth(newCurrentDate);
  }

  public static nextMonth(currentDate: Date): Date {
    var newCurrentDate: Date;
    if (currentDate.getMonth() == 11) {
      newCurrentDate = new Date(currentDate.getFullYear() + 1, 0, 1);
    } else {
      newCurrentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      );
    }

    return this.setThisDateIFThisMonth(newCurrentDate);
  }

  private static setThisDateIFThisMonth(date: Date): Date {
    var today = new Date();
    return date.getMonth() === today.getMonth() ? today : date;
  }
}
