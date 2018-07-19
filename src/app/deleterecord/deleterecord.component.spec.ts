import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleterecordComponent } from './deleterecord.component';

describe('DeleterecordComponent', () => {
  let component: DeleterecordComponent;
  let fixture: ComponentFixture<DeleterecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleterecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleterecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
