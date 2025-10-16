import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandSetInventoryComponent } from './stand-set-inventory.component';

describe('StandSetInventoryComponent', () => {
  let component: StandSetInventoryComponent;
  let fixture: ComponentFixture<StandSetInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandSetInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandSetInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
