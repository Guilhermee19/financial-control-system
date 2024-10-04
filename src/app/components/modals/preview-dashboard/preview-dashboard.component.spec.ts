import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewDashboardComponent } from './preview-dashboard.component';

describe('PreviewDashboardComponent', () => {
  let component: PreviewDashboardComponent;
  let fixture: ComponentFixture<PreviewDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewDashboardComponent]
    });
    fixture = TestBed.createComponent(PreviewDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});