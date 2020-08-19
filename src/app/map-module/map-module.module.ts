import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveMapComponent } from './live-map/live-map.component';
import { ProgressSpinnerModule } from '../progress-spinner-module/progress-spinner.module';
import { batteryLocateMap } from './battery-locate-map/battery-locate-map';



@NgModule({
  declarations: [
    LiveMapComponent,
    batteryLocateMap,
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule
  ],exports:[
    LiveMapComponent,
    batteryLocateMap
  ]
})
export class MapModuleModule { }
