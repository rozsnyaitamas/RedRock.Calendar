import { Injectable } from '@angular/core';
import { FinanceDTO } from '@redrock/generated-html-client/models';
import { FinanceAPIClient } from '@redrock/generated-html-client/services/finance/finance-api-client.service';
import { DateTimeHelper } from '@redrock/shared/helpers/date-time.helper';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  constructor(private readonly api: FinanceAPIClient) {}

  public async getMonthlyFee(
    userID: string,
    date: Date,
  ): Promise<FinanceDTO[]> {
    let startDate = DateTimeHelper.firstDayOfThisMonth(date).toISOString();
    let endDate = DateTimeHelper.lastDayOfThisMonth(date).toISOString();
    return firstValueFrom(
      this.api.getMonthlyFee({
        userReference: userID,
        startDate: startDate,
        endDate: endDate,
      })
    ).then((financeDTO) => {
      console.log(financeDTO); //TODO clear this
      return financeDTO;
    });
  }
}
