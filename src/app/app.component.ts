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
  search : Search;
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
          this.isRequesting = false;
     }, 
      err => {
           console.log(err);
      });


  } 

  getDate() : string
  {
  
  var today = new Date();
var dd = today.getDate();

var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();

this.todayDate = yyyy + '-' + mm + '-' + dd;

if(dd<10) {
var dd1 = '0'+dd;
this.todayDate = yyyy + '-' + mm + '-' + dd1;
} 

if(mm<10) {
var mm1 = '0'+mm;
this.todayDate = yyyy + '-' + mm1 + '-' + dd;
} 

if((mm<10)&&(dd<10)) {
this.todayDate = yyyy + '-' + mm1 + '-' + dd1;
}

return this.todayDate;
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

  searchForm() : void
  {

    this.isRequesting = true;

if(!this.searches)
{
this.searches = new Array<Search>();
}

this.search = new Search();
this.search.id = this.searches.length +1;
this.search.time = this.getTime();

var date_from;
var date_to;

if(!this.match_date_from)
{
//  this.match_date_from = this.getDate();
date_from = "2016-01-01";
} else 
{
  date_from = this.match_date_from;
}

if(!this.match_date_to)
{
// this.match_date_to = this.getDate();
date_to = this.getDate();
} else 
{
  date_to = this.match_date_to;
}

    this.apiService.getEvents(date_from, date_to, this.myLeague).then(events=>{ this.search.events = events;
      this.searches.push(this.search); this.stopRefreshing()
    });  
 

  }

  private stopRefreshing() {
    this.isRequesting = false;
}


  showSearch(search)
  {
    let indexOfSearch = this.searches.indexOf(search);

    this.search = this.searches[indexOfSearch]

  }



}
