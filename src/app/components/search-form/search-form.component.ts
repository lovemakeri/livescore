import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ApiService, League, Event, Country, Search, DataToComponent } from './../../services/api.service';
import { DateService } from './../../services/date.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  countries : Country[];
  leagues : League[];
  myLeague : number;
  todo : FormGroup;
  public newSearch : Search;
  public searches : Search[];

newData : DataToComponent; 

  match_date_from: string = null;
  match_date_to: string = null;

  public isRequesting: boolean;

  constructor(  private apiService : ApiService, private formBuilder: FormBuilder, private dateService: DateService )
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

    sendData()
    {

      var date_from : string;
      var date_to : string;
      
      if(!this.match_date_from)
      {
      date_from = "2016-01-01";
      } else 
      {
        date_from = this.match_date_from;
      }
      
      if(!this.match_date_to)
      {
      date_to = this.dateService.getDate();
      } else 
      {
        date_to = this.match_date_to;
      }

      this.newData = { 'date_from' : date_from, 'date_to' : date_to, 'league' : this.myLeague }

      this.apiService.addData(this.newData);

    }

    private stopRefreshing() {
      this.isRequesting = false;
  }
  
    
    

}
