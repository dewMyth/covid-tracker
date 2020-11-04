import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { GlobalDataSummary } from 'src/app/models/GlobalDataSummary';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 


  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData : GlobalDataSummary[];
  pieChart : GoogleChartInterface = {
    chartType : 'PieChart'
  }
  columnChart : GoogleChartInterface = {
    chartType : 'ColumnChart'
  }

  strConfirmed = '';
  strActive = '';
  strDeaths = '';
  strRecovered = '';

  constructor(private dataService : DataServiceService) { }


  numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  initChart(){

    let datatable = [];
    datatable.push(["Country", "Cases"])
    console.log(datatable)
    this.globalData.forEach(cs=>{
      if(cs.confirmed > 1000000)
      datatable.push([cs.country,cs.confirmed])
    })
  
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: {height : 500},
    };

    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: {height : 500}
    };


  }

  ngOnInit() {
    this.dataService.getGlobalData().subscribe(
      {
        next : (result) => {
          this.globalData = result;
          result.forEach(cs=>{
            if(!Number.isNaN(cs.confirmed)){
              this.totalConfirmed += cs.confirmed,
              this.totalActive += cs.active,
              this.totalDeaths += cs.deaths,
              this.totalRecovered += cs.recovered
            }
          })
        
           this.initChart();
           this.strConfirmed = this.numberWithCommas(this.totalConfirmed);
           this.strActive = this.numberWithCommas(this.totalActive);
           this.strDeaths = this.numberWithCommas(this.totalDeaths);
           this.strRecovered = this.numberWithCommas(this.totalRecovered);
        }
      }
    )
  }

 

}
