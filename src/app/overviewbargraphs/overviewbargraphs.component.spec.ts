import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewbargraphsComponent } from './overviewbargraphs.component';

describe('OverviewbargraphsComponent', () => {
  let component: OverviewbargraphsComponent;
  let fixture: ComponentFixture<OverviewbargraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewbargraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewbargraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
