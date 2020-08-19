import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsCardTemplateComponent } from './assets-card-template.component';

describe('AssetsCardTemplateComponent', () => {
  let component: AssetsCardTemplateComponent;
  let fixture: ComponentFixture<AssetsCardTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsCardTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsCardTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
