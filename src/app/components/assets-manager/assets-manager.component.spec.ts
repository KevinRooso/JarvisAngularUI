import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsManagerComponent } from './assets-manager.component';

describe('AssetsManagerComponent', () => {
  let component: AssetsManagerComponent;
  let fixture: ComponentFixture<AssetsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
