import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIncomeTableComponent } from './admin-income-table.component';

describe('AdminIncomeTableComponent', () => {
  let component: AdminIncomeTableComponent;
  let fixture: ComponentFixture<AdminIncomeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminIncomeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIncomeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
