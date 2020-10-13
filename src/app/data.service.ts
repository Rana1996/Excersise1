import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data = "";

  constructor() { }

  setData(newData: string) {
    this.data = newData;
  }

  getData() {
    return this.data.length == 0 ? oldData : this.data;
  }
}
let oldData = "00:01:07,400-234-090\n00:05:01,701-080-080\n00:05:00,400-234-090";
