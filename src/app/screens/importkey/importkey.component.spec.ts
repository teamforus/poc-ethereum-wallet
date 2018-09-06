import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportkeyComponent } from './importkey.component';

describe('ImportkeyComponent', () => {
  let component: ImportkeyComponent;
  let fixture: ComponentFixture<ImportkeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportkeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
