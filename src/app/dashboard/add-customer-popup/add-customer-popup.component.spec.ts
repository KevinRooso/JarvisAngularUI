import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerPopupComponent } from './add-customer-popup.component';

describe('AddCustomerPopupComponent', () => {
  let component: AddCustomerPopupComponent;
  let fixture: ComponentFixture<AddCustomerPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
