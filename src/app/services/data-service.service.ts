import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/GlobalDataSummary';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private golbalDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/11-02-2020.csv'

  constructor(private http : HttpClient) { }

  getGlobalData(){
    return this.http.get(this.golbalDataUrl, {responseType : 'text'}).pipe(
       map(result => {
        let data: GlobalDataSummary[] = [];
        let rows = result.split('\n');
        rows.splice(0,1);
        rows.forEach( row => {
          let cols = row.split(/,(?=\S)/);
          data.push({
            country : cols[3],
            confirmed : parseInt(cols[7]),   //In type script we can use " + " instead of parseInt ---> Ex : +col(7)
            deaths : parseInt(cols[8]),
            recovered : +cols[9],
            active : +cols[10], 
          })
        })

        console.log(data);
        return [];
      })
    )
  }
}
