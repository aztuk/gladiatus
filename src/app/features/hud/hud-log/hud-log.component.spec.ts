import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HudLogComponent } from './hud-log.component';

describe('HudLogComponent', () => {
  let component: HudLogComponent;
  let fixture: ComponentFixture<HudLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HudLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HudLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
