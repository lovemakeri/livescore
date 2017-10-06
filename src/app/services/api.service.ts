import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
/* import { League } from './../classes/league';
import { Event } from './../classes/event';
 import { Country } from './../classes/country'; */

const APIkey = 'ef8c3e1b38a74d496702d088aed911fd02757ff9899cd58fece0ba62cd9b52f2';

const urlCountry : string = 'https://apifootball.com/api/?action=get_countries';

const urlLeague : string = 'https://apifootball.com/api/?action=get_leagues';

const urlEvent : string = 'https://apifootball.com/api/?action=get_events';


@Injectable()
export class ApiService  {

  leagues : League[];
  events : Event[];

  public selectedSearch : Search;
  public searches : Search[];

defaultData : DataToComponent = {
  date_from: '01-01-2016',
  date_to: '01-01-2017',
  league: 0
};

  private searchSource = new BehaviorSubject<DataToComponent>(this.defaultData);

  currentSearch = this.searchSource.asObservable();

  constructor(private http: Http) { }

  addData(newData: DataToComponent) : void
  {
    this.searchSource.next(newData);
  }

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

}

export interface Country {
  country_id: number;
  country_name: string;
}

export interface League {
  country_id: number;
  country_name: string;
  league_id: number;
  league_name: string;
}

export interface Event {
  match_id: number;
  country_id: number;
  country_name: string;
  league_id: number;
  league_name: string;
  match_date: string;
  match_status: string;
  match_time: string;
  match_hometeam_name: string;
  match_hometeam_score: number;
  match_awayteam_name: string;
  match_awayteam_score: number;
  match_hometeam_halftime_score: number;
  match_awayteam_halftime_score: number;
  match_live: number;         
}

export interface Search {
  id: number;
  time: string;
  events: Event[];
}

export interface DataToComponent {
  date_from: string;
  date_to: string;
  league: number;
}