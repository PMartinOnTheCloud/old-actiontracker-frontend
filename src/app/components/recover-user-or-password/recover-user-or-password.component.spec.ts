import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverUserOrPasswordComponent } from './recover-user-or-password.component';

describe('RecoverUserOrPasswordComponent', () => {
  let component: RecoverUserOrPasswordComponent;
  let fixture: ComponentFixture<RecoverUserOrPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverUserOrPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverUserOrPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
