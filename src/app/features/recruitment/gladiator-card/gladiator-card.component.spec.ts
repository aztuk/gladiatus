import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GladiatorCardComponent } from './gladiator-card.component';

describe('GladiatorCardComponent', () => {
  let component: GladiatorCardComponent;
  let fixture: ComponentFixture<GladiatorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GladiatorCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GladiatorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
