import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HudReputationComponent } from './hud-reputation.component';

describe('HudReputationComponent', () => {
  let component: HudReputationComponent;
  let fixture: ComponentFixture<HudReputationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HudReputationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HudReputationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
