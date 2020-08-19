import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubComponentTreeComponent } from './sub-component-tree.component';

describe('SubComponentTreeComponent', () => {
  let component: SubComponentTreeComponent;
  let fixture: ComponentFixture<SubComponentTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubComponentTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubComponentTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
