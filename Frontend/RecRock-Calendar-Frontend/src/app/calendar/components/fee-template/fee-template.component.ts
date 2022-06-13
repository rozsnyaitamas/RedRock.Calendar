import { Component, Input, OnInit } from '@angular/core';
import { FinanceDTO } from '@redrock/generated-html-client/models';
import { UserService } from '@redrock/services/user.service';
import { DateTimeHelper } from '@redrock/shared/helpers/date-time.helper';

@Component({
  selector: 'app-fee-template',
  templateUrl: './fee-template.component.html',
  styleUrls: ['./fee-template.component.scss']
})
export class FeeTemplateComponent implements OnInit {

  @Input() financeDTO!: FinanceDTO;
  public usersFullName!: string;
  public feeMonth!: string;


  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.userService.getById(this.financeDTO.userReference).then((user) =>
    this.usersFullName = user.fullName
    );
    this.feeMonth = DateTimeHelper.toMonthName(this.financeDTO.month);
  }

}
