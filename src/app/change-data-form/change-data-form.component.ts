import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {DataService} from '../data.service';

@Component({
  selector: 'app-change-data-form',
  templateUrl: './change-data-form.component.html',
  styleUrls: ['./change-data-form.component.css']
})
export class ChangeDataFormComponent implements OnInit {
  @Output() editMode = new EventEmitter<boolean>();

  dataForm = new FormControl('', [
    Validators.required,
  ]);

  constructor(private data: DataService) { }

  ngOnInit(): void {
  }

  cancel() { this.editMode.emit(false); }

  change() {
    console.log('######### value of dataForm: ' + this.dataForm.value);
    this.data.setData(this.dataForm.value);
    this.cancel();
  }

}
