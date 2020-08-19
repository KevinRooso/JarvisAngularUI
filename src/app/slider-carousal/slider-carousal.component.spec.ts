import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderCarousalComponent } from './slider-carousal.component';

describe('SliderCarousalComponent', () => {
  let component: SliderCarousalComponent;
  let fixture: ComponentFixture<SliderCarousalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderCarousalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderCarousalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
