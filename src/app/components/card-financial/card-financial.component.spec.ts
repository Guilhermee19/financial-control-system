import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFinancialComponent } from './card-financial.component';

describe('CardFinancialComponent', () => {
  let component: CardFinancialComponent;
  let fixture: ComponentFixture<CardFinancialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardFinancialComponent]
    });
    fixture = TestBed.createComponent(CardFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
