import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongregationsFormAddEditComponent } from './congregations-form-add-edit.component';

describe('CongregationsFormAddEditComponent', () => {
  let component: CongregationsFormAddEditComponent;
  let fixture: ComponentFixture<CongregationsFormAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CongregationsFormAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongregationsFormAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
