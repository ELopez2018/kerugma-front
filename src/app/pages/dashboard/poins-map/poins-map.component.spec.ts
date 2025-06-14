import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoinsMapComponent } from './poins-map.component';

describe('PoinsMapComponent', () => {
  let component: PoinsMapComponent;
  let fixture: ComponentFixture<PoinsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoinsMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoinsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
