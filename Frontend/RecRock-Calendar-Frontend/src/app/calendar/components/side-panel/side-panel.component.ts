import { Component, Input, OnInit } from '@angular/core';
import { FinanceService } from '@redrock/services/finance.service';
import { StorageHelper } from '@redrock/shared/helpers/storage.helper';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {

  @Input() viewDate: Date = new Date();

  constructor(private readonly financeService: FinanceService) { }

  ngOnInit(): void {
  }

  getFee(): void {
    console.log("works");
    var userId = StorageHelper.getUserId(sessionStorage);
    if(userId){
      this.financeService.getMonthlyFee(userId, this.viewDate);
    }
  }

}
