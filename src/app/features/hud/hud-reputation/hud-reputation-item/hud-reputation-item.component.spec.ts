import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HudReputationItemComponent } from './hud-reputation-item.component';

describe('HudReputationItemComponent', () => {
  let component: HudReputationItemComponent;
  let fixture: ComponentFixture<HudReputationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HudReputationItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HudReputationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
