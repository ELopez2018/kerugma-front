import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandSetPointComponent } from './stand-set-point.component';

describe('StandSetPointComponent', () => {
  let component: StandSetPointComponent;
  let fixture: ComponentFixture<StandSetPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandSetPointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandSetPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
