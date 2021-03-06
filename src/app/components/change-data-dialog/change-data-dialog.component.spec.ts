import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDataDialogComponent } from './change-data-dialog.component';

describe('ChangeDataDialogComponent', () => {
  let component: ChangeDataDialogComponent<any>;
  let fixture: ComponentFixture<ChangeDataDialogComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeDataDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
