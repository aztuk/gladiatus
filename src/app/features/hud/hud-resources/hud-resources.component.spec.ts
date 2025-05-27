import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HudResourcesComponent } from './hud-resources.component';

describe('HudResourcesComponent', () => {
  let component: HudResourcesComponent;
  let fixture: ComponentFixture<HudResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HudResourcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HudResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
