import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GladiatorPanelComponent } from './gladiator-panel.component';

describe('GladiatorPanelComponent', () => {
  let component: GladiatorPanelComponent;
  let fixture: ComponentFixture<GladiatorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GladiatorPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GladiatorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
