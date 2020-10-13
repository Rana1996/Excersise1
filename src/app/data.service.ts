import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getData() {
    return data;
  }
}

let data = "00:01:07,400-234-090\n00:05:01,701-080-080\n00:05:00,400-234-090";
