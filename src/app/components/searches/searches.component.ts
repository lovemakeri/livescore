import { Component, OnInit } from '@angular/core';
import { ApiService, League, Event, Search, DataToComponent } from './../../services/api.service';

import { DateService } from './../../services/date.service';

@Component({
  selector: 'app-searches',
  templateUrl: './searches.component.html',
  styleUrls: ['./searches.component.css'],
})
export class SearchesComponent implements OnInit {

  event : Event;
  events : Event[];
  selectedSearch : Search;
  searches : Search[];

  myLeague : League;

  public isRequesting: boolean;



  constructor( public apiService: ApiService, private dateService : DateService ) {  }

  ngOnInit() {

    this.apiService.currentSearch.subscribe( newData => { 

if(newData.league==0)
{
  
} else 
{
  this.getScores(newData);
}

    }
    );

  }

  getScores(newData) : void
  {

    this.isRequesting = true;

if(!this.searches)
{
this.searches = new Array<Search>();
}

var date_from = newData.date_from;

var date_to = newData.date_to;

this.myLeague = newData.league;

    this.apiService.getEvents(date_from, date_to, this.myLeague).then(events=>{ 
      
      this.selectedSearch =  {
        id: this.searches.length +1,
        time: this.dateService.getTime(),
        events: events
      }
     
      this.searches.push(this.selectedSearch);
       this.stopRefreshing();
     
    }).catch(error => {
     
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);
          this.stopRefreshing();
        });
  
  }
  

  private stopRefreshing() {
    this.isRequesting = false;
}


  showSearch(search)
  {
    let indexOfSearch = this.searches.indexOf(search);

    this.selectedSearch = this.searches[indexOfSearch]

  }



 

}
