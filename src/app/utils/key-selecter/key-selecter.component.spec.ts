import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeySelecterComponent } from './key-selecter.component';

describe('KeySelecterComponent', () => {
  let component: KeySelecterComponent;
  let fixture: ComponentFixture<KeySelecterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeySelecterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeySelecterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
