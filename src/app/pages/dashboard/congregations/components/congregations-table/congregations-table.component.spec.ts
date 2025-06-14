import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongregationsTableComponent } from './congregations-table.component';

describe('CongregationsTableComponent', () => {
  let component: CongregationsTableComponent;
  let fixture: ComponentFixture<CongregationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CongregationsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongregationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
