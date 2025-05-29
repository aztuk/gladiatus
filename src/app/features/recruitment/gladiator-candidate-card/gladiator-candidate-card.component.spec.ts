import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GladiatorCandidateCardComponent } from './gladiator-candidate-card.component';

describe('GladiatorCandidateCardComponent', () => {
  let component: GladiatorCandidateCardComponent;
  let fixture: ComponentFixture<GladiatorCandidateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GladiatorCandidateCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GladiatorCandidateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
