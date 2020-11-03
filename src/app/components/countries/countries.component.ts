import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/GlobalDataSummary';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {


  strConfirmed = '';
  strActive = '';
  strDeaths = '';
  strRecovered = '';
  
  data : GlobalDataSummary[];
  countries : string[] = [];

  constructor(private dataService : DataServiceService) { }


  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(result=>{
      this.data = result;
      this.data.forEach(cs => {
        this.countries.push(cs.country)
        console.log(this.countries);   
      })
    })
  }


  numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  updateValues(country : string){
    this.data.forEach(cs=>{
      if(cs.country == country){
        this.strConfirmed = this.numberWithCommas(cs.confirmed);
        this.strActive = this.numberWithCommas(cs.active);
        this.strDeaths = this.numberWithCommas(cs.deaths);
        this.strRecovered = this.numberWithCommas(cs.recovered);
      }
    })
  }

}
