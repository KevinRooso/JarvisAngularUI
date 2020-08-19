import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsIdentificationComponent } from './assets-identification.component';

describe('AssetsIdentificationComponent', () => {
  let component: AssetsIdentificationComponent;
  let fixture: ComponentFixture<AssetsIdentificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsIdentificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
