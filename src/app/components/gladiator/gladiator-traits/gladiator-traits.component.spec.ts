import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GladiatorTraitsComponent } from './gladiator-traits.component';

describe('GladiatorTraitsComponent', () => {
  let component: GladiatorTraitsComponent;
  let fixture: ComponentFixture<GladiatorTraitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GladiatorTraitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GladiatorTraitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
