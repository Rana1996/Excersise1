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
  result = 0;
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

  addCallTime(same_phone_number: Call, detailedCall: Call) {
    //Seconds
    same_phone_number.seconds += detailedCall.seconds;
    if(same_phone_number.seconds >= 60){
      same_phone_number.seconds -= 60;
      same_phone_number.minutes++;
    }
    //Minutes
    same_phone_number.minutes += detailedCall.minutes;
    if(same_phone_number.minutes >= 60){
      same_phone_number.minutes -= 60;
      same_phone_number.hours++;
    }
    same_phone_number.hours += detailedCall.hours;
  }

  calculateAll() {
    for(let call of this.calls_list) {
      let detailedCall = this.getCallDetails(call);
      this.calculateCallCost(detailedCall);
      let same_phone_number = this.call_total_time_list.find(call => call.phone_number == detailedCall.phone_number);
      if(same_phone_number == undefined)
        this.call_total_time_list.push(detailedCall);
      else {this.addCallTime(same_phone_number, detailedCall);}
    }
    this.max = this.call_total_time_list.reduce(function(prev, current) {
      if(prev.hours == current.hours)
        if(prev.minutes == current.minutes)
          return (prev.seconds > current.seconds) ? prev : current;
        else
          return (prev.minutes > current.minutes) ? prev : current;
      else
        return (prev.hours > current.hours) ? prev : current;
    });
    this.calculateResult();
    this.isReady = true;
  }

  private calculateResult() {
    let free_calls_phone = this.max.phone_number;
    for(let call of this.call_cost_list){
      if(call.phone_number != free_calls_phone)
        this.result += call.cost;
    }
  }
}

export class Call {
  phone_number: string;
  hours: number;
  minutes: number;
  seconds: number;
}

export class CallCost {
  phone_number: string;
  cost: number;
}
