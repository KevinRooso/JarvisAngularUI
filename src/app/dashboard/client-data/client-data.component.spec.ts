import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDataComponent } from './client-data.component';

describe('ClientDataComponent', () => {
  let component: ClientDataComponent;
  let fixture: ComponentFixture<ClientDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
