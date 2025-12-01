import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewCardListComponent } from './user-view-card-list.component';

describe('UserViewCardListComponent', () => {
  let component: UserViewCardListComponent;
  let fixture: ComponentFixture<UserViewCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserViewCardListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserViewCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
