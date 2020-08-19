import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsConfigurationComponent } from './assets-configuration.component';

describe('AssetsConfigurationComponent', () => {
  let component: AssetsConfigurationComponent;
  let fixture: ComponentFixture<AssetsConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
