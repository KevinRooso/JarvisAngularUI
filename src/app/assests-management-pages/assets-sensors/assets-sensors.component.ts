import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-assets-sensors',
  templateUrl: './assets-sensors.component.html',
  styleUrls: ['./assets-sensors.component.scss']
})
export class AssetsSensorsComponent implements OnInit {
  sensorForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.sensorForm = new FormGroup({
      acceleroMeter: new FormControl()
    });

}
}
