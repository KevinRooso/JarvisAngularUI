import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetModelComponent } from './asset-model.component';

describe('AssetModelComponent', () => {
  let component: AssetModelComponent;
  let fixture: ComponentFixture<AssetModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
