import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsSensorsComponent } from './assets-sensors.component';

describe('AssetsSensorsComponent', () => {
  let component: AssetsSensorsComponent;
  let fixture: ComponentFixture<AssetsSensorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsSensorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsSensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
