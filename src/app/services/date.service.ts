import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  constructor() { }


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
