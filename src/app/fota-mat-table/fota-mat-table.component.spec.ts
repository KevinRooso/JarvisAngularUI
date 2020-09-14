import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotaMatTableComponent } from './fota-mat-table.component';

describe('FotaMatTableComponent', () => {
  let component: FotaMatTableComponent;
  let fixture: ComponentFixture<FotaMatTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotaMatTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotaMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
