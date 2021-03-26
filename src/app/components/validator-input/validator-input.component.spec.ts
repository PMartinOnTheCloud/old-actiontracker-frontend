import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorInputComponent } from './validator-input.component';

describe('ValidatorInputComponent', () => {
  let component: ValidatorInputComponent;
  let fixture: ComponentFixture<ValidatorInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatorInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
