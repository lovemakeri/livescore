import { Component, OnInit } from '@angular/core';
import { Event } from './classes/event';
import { League } from './classes/league';
import { Country } from './classes/country';
import { Search } from './classes/search';
import { ApiService } from './services/api.service'
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

// import {SpinnerComponent} from './components/spinner/spinner.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'Livescores';
  countries : Country[];
  leagues : League[];
  myLeague : number;
  event : Event;
  events : Event[];
  selectedSearch : Search;
  searches : Search[];
  todo : FormGroup;

  match_date_from: string = null;
  match_date_to: string = null;

   todayDate : string;

  public isRequesting: boolean;
  
constructor(  private apiService : ApiService, private formBuilder: FormBuilder )
{

  this.todo = this.formBuilder.group({
    match_date_from: [''],
    match_date_to: [''],
    country: ['', Validators.required],
    league: ['', Validators.required],
  });



}

ngOnInit(): void {
  
      this.getCountries();
  }

  getCountries() : void
  {

    this.apiService.getCountries().subscribe(
       countries => {
                this.countries = countries;

      }, 
      err => {
                console.log(err);
      });

  }

  onSelectCountry(country) : void
  {
 
    this.getLeagues(country);

  }

  getLeagues(country) :void
  {
    this.isRequesting = true;
    this.apiService.getLeagues(country).subscribe(
      leagues => {
          
          this.leagues = leagues;
          this.stopRefreshing();
     }, 
      err => {
           console.log(err);
           this.stopRefreshing();
      });


  } 

  

  searchForm() : void
  {

    this.isRequesting = true;

if(!this.searches)
{
this.searches = new Array<Search>();
}

this.selectedSearch = new Search();
this.selectedSearch.id = this.searches.length +1;
this.selectedSearch.time = this.apiService.getTime();

var date_from;
var date_to;

if(!this.match_date_from)
{
date_from = "2016-01-01";
} else 
{
  date_from = this.match_date_from;
}

if(!this.match_date_to)
{
date_to = this.apiService.getDate();
} else 
{
  date_to = this.match_date_to;
}

    this.apiService.getEvents(date_from, date_to, this.myLeague).then(events=>{ this.selectedSearch.events = events;
      this.searches.push(this.selectedSearch); this.stopRefreshing();
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
