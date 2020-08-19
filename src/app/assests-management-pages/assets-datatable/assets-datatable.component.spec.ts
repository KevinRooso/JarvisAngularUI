import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsDatatableComponent } from './assets-datatable.component';

describe('AssetsDatatableComponent', () => {
  let component: AssetsDatatableComponent;
  let fixture: ComponentFixture<AssetsDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
