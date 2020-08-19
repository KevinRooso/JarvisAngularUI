import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceRouteComponent } from './trace-route.component';

describe('TraceRouteComponent', () => {
  let component: TraceRouteComponent;
  let fixture: ComponentFixture<TraceRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraceRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraceRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
