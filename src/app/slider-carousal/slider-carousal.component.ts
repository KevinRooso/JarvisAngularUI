import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slider-carousal',
  templateUrl: './slider-carousal.component.html',
  styleUrls: ['./slider-carousal.component.scss']
})
export class SliderCarousalComponent implements OnInit {

  constructor(config: NgbCarouselConfig) {
    config.interval = 5000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit() {
  }

}
