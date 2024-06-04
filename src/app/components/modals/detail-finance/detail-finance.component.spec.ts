import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFinanceComponent } from './detail-finance.component';

describe('DetailFinanceComponent', () => {
  let component: DetailFinanceComponent;
  let fixture: ComponentFixture<DetailFinanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailFinanceComponent]
    });
    fixture = TestBed.createComponent(DetailFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
