import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { ApiService} from './services/api.service';
import { DateService} from './services/date.service';
// import { RouterModule, Routes } from '@angular/router';



import { AppComponent } from './app.component';
// import { CountryComponent } from './components/country/country.component';
// import { LeagueComponent } from './components/league/league.component';
import { SearchesComponent } from './components/searches/searches.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
/*
const appRoutes: Routes = [
    { path: 'league/:id',   component: SearchesComponent }
 
];
*/

@NgModule({
  declarations: [
    AppComponent,
 /*   CountryComponent,
    LeagueComponent,  */
    SearchesComponent,
    SearchFormComponent,   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
 
  ],
  providers: [ApiService, DateService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
