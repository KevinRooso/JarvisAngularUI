import { Component, Input, OnInit, ViewChild, TemplateRef, ViewContainerRef, DoCheck } from '@angular/core';
import { ProgressSpinnerMode, ThemePalette } from '@angular/material';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html'
  
})
export class ProgressSpinnerComponent {
  @Input() color?: ThemePalette;
  @Input() diameter?: number = 100;
  @Input() mode?: ProgressSpinnerMode;
  @Input() strokeWidth?: number;
  @Input() value?: number;
}