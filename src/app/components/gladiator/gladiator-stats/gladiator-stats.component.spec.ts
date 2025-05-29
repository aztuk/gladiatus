import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GladiatorStatsComponent } from './gladiator-stats.component';

describe('GladiatorStatsComponent', () => {
  let component: GladiatorStatsComponent;
  let fixture: ComponentFixture<GladiatorStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GladiatorStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GladiatorStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
