import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsDetailViewComponent } from './assets-detail-view.component';

describe('AssetsDetailViewComponent', () => {
  let component: AssetsDetailViewComponent;
  let fixture: ComponentFixture<AssetsDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
