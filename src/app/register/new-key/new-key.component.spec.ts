import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewKeyComponent } from '@app/register/new-key/new-key.component';

describe('NewUserComponent', () => {
  let component: NewKeyComponent;
  let fixture: ComponentFixture<NewKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
