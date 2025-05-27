import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HudRootComponent } from './hud-root.component';

describe('HudRootComponent', () => {
  let component: HudRootComponent;
  let fixture: ComponentFixture<HudRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HudRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HudRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
