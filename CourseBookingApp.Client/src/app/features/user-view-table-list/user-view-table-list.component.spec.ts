import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewTableListComponent } from './user-view-table-list.component';

describe('UserViewTableListComponent', () => {
  let component: UserViewTableListComponent;
  let fixture: ComponentFixture<UserViewTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserViewTableListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserViewTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
