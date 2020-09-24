import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMatTableComponent } from './role-mat-table.component';

describe('RoleMatTableComponent', () => {
  let component: RoleMatTableComponent;
  let fixture: ComponentFixture<RoleMatTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleMatTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
