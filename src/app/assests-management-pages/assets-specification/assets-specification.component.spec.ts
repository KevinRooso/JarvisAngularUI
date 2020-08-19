import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsSpecificationComponent } from './assets-specification.component';

describe('AssetsSpecificationComponent', () => {
  let component: AssetsSpecificationComponent;
  let fixture: ComponentFixture<AssetsSpecificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsSpecificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
