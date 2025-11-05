import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersApproverComponent } from './users-approver.component';

describe('UsersApproverComponent', () => {
  let component: UsersApproverComponent;
  let fixture: ComponentFixture<UsersApproverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersApproverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersApproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
