import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { ApiService} from './services/api.service';

import {MatProgressSpinnerModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material';

import { AppComponent } from './app.component';
// import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
   // SpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [ApiService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
