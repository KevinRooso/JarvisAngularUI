import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsVisualizeComponent } from './assets-visualize.component';

describe('AssetsVisualizeComponent', () => {
  let component: AssetsVisualizeComponent;
  let fixture: ComponentFixture<AssetsVisualizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsVisualizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsVisualizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
