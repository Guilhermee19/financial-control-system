import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeDarkLightComponent } from './theme-dark-light.component';

describe('ThemeDarkLightComponent', () => {
  let component: ThemeDarkLightComponent;
  let fixture: ComponentFixture<ThemeDarkLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeDarkLightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeDarkLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
