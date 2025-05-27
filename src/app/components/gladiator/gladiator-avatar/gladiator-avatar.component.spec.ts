import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GladiatorAvatarComponent } from './gladiator-avatar.component';

describe('GladiatorAvatarComponent', () => {
  let component: GladiatorAvatarComponent;
  let fixture: ComponentFixture<GladiatorAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GladiatorAvatarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GladiatorAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
