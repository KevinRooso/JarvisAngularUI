import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleMapComponent } from './bubble-map.component';

describe('BubbleMapComponent', () => {
  let component: BubbleMapComponent;
  let fixture: ComponentFixture<BubbleMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BubbleMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
