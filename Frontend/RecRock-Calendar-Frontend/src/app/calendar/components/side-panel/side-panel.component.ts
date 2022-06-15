import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FinanceDTO } from '@redrock/generated-html-client/models';
import { FinanceService } from '@redrock/services/finance.service';
import { StorageHelper } from '@redrock/shared/helpers/storage.helper';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
})
export class SidePanelComponent implements OnInit {
  @Input() viewDate: Date = new Date();
  financeDTOs: FinanceDTO[] = [];
  overallSum: number = 0;
  @ViewChild('feesContent') feesContent!: ElementRef;

  constructor(private readonly financeService: FinanceService) {}

  ngOnInit(): void {}

  getFee(): void {
    var userId = StorageHelper.getUserId(sessionStorage);
    if (userId) {
      this.financeService
        .getMonthlyFee(userId, this.viewDate)
        .then((financeDTOs) => {
          this.financeDTOs = financeDTOs;
          financeDTOs.forEach((financeDTO) => {
            this.overallSum += financeDTO.sum;
          });
        });
    }
  }

  exportPdf() {
  }
}
