import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCredentialsComponent } from './users-credentials.component';

describe('UsersCredentialsComponent', () => {
  let component: UsersCredentialsComponent;
  let fixture: ComponentFixture<UsersCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersCredentialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
