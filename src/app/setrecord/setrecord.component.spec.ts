import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetrecordComponent } from './setrecord.component';

describe('SetrecordComponent', () => {
  let component: SetrecordComponent;
  let fixture: ComponentFixture<SetrecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetrecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
