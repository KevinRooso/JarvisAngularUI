import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotaLogComponent } from './fota-log.component';

describe('FotaLogComponent', () => {
  let component: FotaLogComponent;
  let fixture: ComponentFixture<FotaLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotaLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotaLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
