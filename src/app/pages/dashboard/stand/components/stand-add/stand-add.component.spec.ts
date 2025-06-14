import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandAddComponent } from './stand-add.component';

describe('StandAddComponent', () => {
  let component: StandAddComponent;
  let fixture: ComponentFixture<StandAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
