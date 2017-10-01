import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { League } from './../classes/league';
import { Event } from './../classes/event';
import { Country } from './../classes/country';

const APIkey = 'ef8c3e1b38a74d496702d088aed911fd02757ff9899cd58fece0ba62cd9b52f2';

const urlCountry : string = 'https://apifootball.com/api/?action=get_countries';

const urlLeague : string = 'https://apifootball.com/api/?action=get_leagues';

const urlEvent : string = 'https://apifootball.com/api/?action=get_events';


@Injectable()
export class ApiService {

  leagues : League[];
  events : Event[];

  constructor(private http: Http) { }


  getCountries(): Observable<Country[]> {
 
       let myUrl = urlCountry + '&APIkey=' + APIkey;
     
    
     return this.http.get(myUrl)
      
        .map((res:Response) => res.json())
       
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
     
     }

     getLeagues(country_id): Observable<League[]> {
      
          let myUrl = urlLeague + '&country_id=' + country_id +'&APIkey=' + APIkey;
      
             
          return this.http.get(myUrl)
          
           .map((res:Response) => res.json())
          
           .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
      
        
        }

        getNewEvents(from, to, league_id): Observable<Event[]> {
          
          let myUrl = urlEvent + '&from='+from + '&to='+ to + '&league_id' + league_id +'&APIkey=' + APIkey;
          
                 
              return this.http.get(myUrl)
              
               .map((res:Response) => res.json())
               
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
            
          
            
            }

        getEvents(from, to, league_id): Promise<Event[]> {
          
          return new Promise(resolve => {

      let myUrl = urlEvent + '&from='+from + '&to='+ to + '&league_id=' + league_id +'&APIkey=' + APIkey;

      console.log(myUrl);

        this.http.get(myUrl).toPromise()
        .then(res => {
        
        this.events = res.json();
        resolve(this.events);
        })
        .catch(error => {
      
          console.log(error.status);
          console.log(error.error); 
          console.log(error.headers);
      
        });
        
        }); 
        
        }


        getDate() : string
        {
        
        var today = new Date();
      var dd = today.getDate();
      
      var mm = today.getMonth()+1; //January is 0!
      
      var yyyy = today.getFullYear();
      
      var todayDate = yyyy + '-' + mm + '-' + dd;
      
      if(dd<10) {
      var dd1 = '0'+dd;
      todayDate = yyyy + '-' + mm + '-' + dd1;
      } 
      
      if(mm<10) {
      var mm1 = '0'+mm;
      todayDate = yyyy + '-' + mm1 + '-' + dd;
      } 
      
      if((mm<10)&&(dd<10)) {
      todayDate = yyyy + '-' + mm1 + '-' + dd1;
      }
      
      return todayDate;
      }
      
      
      getTime() : string
      {
      
      var today = new Date();
      var hh = today.getHours();
      
      var mm = today.getMinutes(); 
      
      var ss = today.getSeconds();
      
      var time = hh + ':' + mm + ':' + ss;
      
      if(hh<10) {
      var hh1 = '0'+hh;
      time = hh1 + ':' + mm + ':' + ss;
      } 
      
      if(mm<10) {
      var mm1 = '0'+mm;
      time = hh + ':' + mm1 + ':' + ss;
      } 
      
      if(ss<10) {
        var ss1 = '0'+ss;
        time = hh + ':' + mm + ':' + ss1;
        } 
      
      if((mm<10)&&(ss<10)) {
      time = hh + ':' + mm1 + ':' + ss1;
      }
      
      if((hh<10)&&(mm<10)) {
        time = hh1 + ':' + mm1 + ':' + ss;
        }
      
      
      if((hh<10)&&(ss<10)) {
        time = hh1 + ':' + mm + ':' + ss1;
        }
      
      return time;
      }


}
