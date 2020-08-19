import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  public color = 'primary';
  public mode = 'indeterminate';
  public value = 50;
 
}

