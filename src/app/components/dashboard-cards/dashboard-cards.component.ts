import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.css']
})
export class DashboardCardsComponent implements OnInit {

  @Input('strConfirmed')
  strConfirmed;
  @Input('strActive')
  strActive;
  @Input('strDeaths')
  strDeaths;
  @Input('strRecovered')
  strRecovered;

  constructor() { }

  ngOnInit(): void {
  }

}
