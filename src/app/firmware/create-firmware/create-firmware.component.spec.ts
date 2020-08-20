import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFirmwareComponent } from './create-firmware.component';

describe('CreateFirmwareComponent', () => {
  let component: CreateFirmwareComponent;
  let fixture: ComponentFixture<CreateFirmwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFirmwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFirmwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
