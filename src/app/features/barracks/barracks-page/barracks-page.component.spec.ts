import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarracksPageComponent } from './barracks-page.component';

describe('BarracksPageComponent', () => {
  let component: BarracksPageComponent;
  let fixture: ComponentFixture<BarracksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarracksPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarracksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
