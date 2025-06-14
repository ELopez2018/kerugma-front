import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointAddEditComponent } from './point-add-edit.component';

describe('PointAddEditComponent', () => {
  let component: PointAddEditComponent;
  let fixture: ComponentFixture<PointAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
