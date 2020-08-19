import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugegraphsComponent } from './gaugegraphs.component';

describe('GaugegraphsComponent', () => {
  let component: GaugegraphsComponent;
  let fixture: ComponentFixture<GaugegraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaugegraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugegraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
