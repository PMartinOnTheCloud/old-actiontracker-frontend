import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityModifierComponent } from './entity-modifier.component';

describe('EntityModifierComponent', () => {
  let component: EntityModifierComponent<any>;
  let fixture: ComponentFixture<EntityModifierComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityModifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
