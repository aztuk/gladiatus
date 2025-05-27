import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemPanelHostComponent } from './system-panel-host.component';

describe('SystemPanelHostComponent', () => {
  let component: SystemPanelHostComponent;
  let fixture: ComponentFixture<SystemPanelHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemPanelHostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemPanelHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
