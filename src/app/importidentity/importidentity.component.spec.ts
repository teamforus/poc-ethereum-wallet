import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportidentityComponent } from './importidentity.component';

describe('ImportidentityComponent', () => {
  let component: ImportidentityComponent;
  let fixture: ComponentFixture<ImportidentityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportidentityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportidentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
