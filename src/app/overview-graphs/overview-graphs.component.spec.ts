import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewGraphsComponent } from './overview-graphs.component';

describe('OverviewGraphsComponent', () => {
  let component: OverviewGraphsComponent;
  let fixture: ComponentFixture<OverviewGraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewGraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
