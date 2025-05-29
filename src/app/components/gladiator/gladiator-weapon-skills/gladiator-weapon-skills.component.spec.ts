import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GladiatorWeaponSkillsComponent } from './gladiator-weapon-skills.component';

describe('GladiatorWeaponSkillsComponent', () => {
  let component: GladiatorWeaponSkillsComponent;
  let fixture: ComponentFixture<GladiatorWeaponSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GladiatorWeaponSkillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GladiatorWeaponSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
