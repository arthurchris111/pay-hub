import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardUserComponent } from './add-card-user.component';

describe('AddCardUserComponent', () => {
  let component: AddCardUserComponent;
  let fixture: ComponentFixture<AddCardUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCardUserComponent]
    });
    fixture = TestBed.createComponent(AddCardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
