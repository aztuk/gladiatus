import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GladiatorListComponent } from './gladiator-list.component';

describe('GladiatorListComponent', () => {
  let component: GladiatorListComponent;
  let fixture: ComponentFixture<GladiatorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GladiatorListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GladiatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
