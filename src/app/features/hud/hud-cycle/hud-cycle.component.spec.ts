import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HudCycleComponent } from './hud-cycle.component';

describe('HudCycleComponent', () => {
  let component: HudCycleComponent;
  let fixture: ComponentFixture<HudCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HudCycleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HudCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
