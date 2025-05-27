import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconFaComponent } from './icon-fa.component';

describe('IconFaComponent', () => {
  let component: IconFaComponent;
  let fixture: ComponentFixture<IconFaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconFaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconFaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
