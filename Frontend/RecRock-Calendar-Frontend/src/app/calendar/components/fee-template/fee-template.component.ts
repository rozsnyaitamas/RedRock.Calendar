import { Component, Input, OnInit } from '@angular/core';
import { FinanceDTO } from '@redrock/generated-html-client/models';

@Component({
  selector: 'app-fee-template',
  templateUrl: './fee-template.component.html',
  styleUrls: ['./fee-template.component.scss']
})
export class FeeTemplateComponent implements OnInit {

  @Input() financeDTO!: FinanceDTO;
  constructor() { }

  ngOnInit(): void {
  }

}
