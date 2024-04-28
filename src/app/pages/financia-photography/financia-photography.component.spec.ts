import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanciaPhotographyComponent } from './financia-photography.component';

describe('FinanciaPhotographyComponent', () => {
  let component: FinanciaPhotographyComponent;
  let fixture: ComponentFixture<FinanciaPhotographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanciaPhotographyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanciaPhotographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
