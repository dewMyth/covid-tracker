import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService : DataServiceService) { }


  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;

  strConfirmed = '';
  strActive = '';
  strDeaths = '';
  strRecovered = '';
  
  numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  ngOnInit() {
    this.dataService.getGlobalData().subscribe(
      {
        next : (result) => {
          result.forEach(cs=>{
            if(!Number.isNaN(cs.confirmed)){
              this.totalConfirmed += cs.confirmed,
              this.totalActive += cs.active,
              this.totalDeaths += cs.deaths,
              this.totalRecovered += cs.recovered
            }
          })
           this.strConfirmed = this.numberWithCommas(this.totalConfirmed);
           this.strActive = this.numberWithCommas(this.totalActive);
           this.strDeaths = this.numberWithCommas(this.totalDeaths);
           this.strRecovered = this.numberWithCommas(this.totalRecovered);
        }
      }
    )
     console.log(this.numberWithCommas(this.totalConfirmed));
  }

 

}
