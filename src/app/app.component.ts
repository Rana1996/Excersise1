import { Component } from '@angular/core';
import {DataService} from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Phone Bill';
  phone_bill: string;
  result: 0;
  calls_list = [];
  call_cost_list: CallCost[] = [];
  call_total_time_list: Call[] = []; // Total time for each number
  max: Call;
  isReady: boolean = false;


  constructor(private data: DataService) {
    this.phone_bill = data.getData().replace(/\n/g, '<br>');
    this.calls_list = this.phone_bill.split('<br>');
    this.calculateAll();
  }

  getCallDetails(call: string) {
    let callDetails = call.split((',')); /// Separating time and phone number
    let callDuration = callDetails[0].split(':'); /// Separating minutes hours and seconds
    let result: Call;
    result = new Call();
    result.phone_number = callDetails[1];
    result.hours = (+callDuration[0]);
    result.minutes = (+callDuration[1]);
    result.seconds = (+callDuration[2]);
    return result;
  }

  calculateSeconds(call: Call) { return call.minutes * 60 + call.seconds; }

  calculateMinutes(call: Call) {
    return call.hours * 60 + call.minutes + (call.seconds > 0 ? 1 : 0);
  }

  calculateCallCost(call: Call) {
    let cost: number;
    // let minutes = call.minutes;
    if(call.hours = 0 && call.minutes < 5) {
      cost = this.calculateSeconds(call) * 3;
    } else {
      cost = this.calculateMinutes(call) * 150;
    }
    let call_cost: CallCost = new CallCost();
    call_cost.phone_number = call.phone_number;
    call_cost.cost = cost;
    this.call_cost_list.push(call_cost);
  }

  addCallTime(phone_number: Call, detailedCall: Call) {
    //Seconds
    phone_number.seconds += detailedCall.seconds;
    if(phone_number.seconds >= 60){
      phone_number.seconds -= 60;
      phone_number.minutes++;
    }
    //Minutes
    phone_number.minutes += detailedCall.minutes;
    if(phone_number.minutes >= 60){
      phone_number.minutes -= 60;
      phone_number.hours++;
    }
    phone_number.hours += detailedCall.hours;
  }

  calculateAll() {
    for(let call of this.calls_list) {
      let detailedCall = this.getCallDetails(call);
      console.log('########## detailedCall.hours, minutes, seconds: ' + detailedCall.hours + ':' + detailedCall.minutes + ':' + detailedCall.seconds);
      this.calculateCallCost(detailedCall);
      let phone_number = this.call_total_time_list.find(call => call.phone_number == detailedCall.phone_number);
      if(phone_number == undefined)
        this.call_total_time_list.push(detailedCall);
      else this.addCallTime(phone_number, detailedCall);
    }
    //calculate max
    // this.max = new ;
    this.isReady = true;
  }
}

export class Call {
  phone_number: string;
  hours: number;
  minutes: number;
  seconds: number;

  // constructor(pn: string, h: number, m: number, s: number) {
  //   this.phone_number = pn;
  //   this.hours = h;
  //   this.minutes = m;
  //   this.seconds = s;
  // }
}

export class CallCost {
  phone_number: string;
  cost: number;
}
