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

  constructor(private data: DataService) {
    this.phone_bill = data.getData().replace(/\n/g, '<br>');
  }
}
