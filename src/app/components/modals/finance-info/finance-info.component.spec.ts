import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceInfoComponent } from './finance-info.component';

describe('FinanceInfoComponent', () => {
  let component: FinanceInfoComponent;
  let fixture: ComponentFixture<FinanceInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinanceInfoComponent]
    });
    fixture = TestBed.createComponent(FinanceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
