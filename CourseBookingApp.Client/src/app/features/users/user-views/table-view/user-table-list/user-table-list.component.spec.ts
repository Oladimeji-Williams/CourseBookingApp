import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableListComponent } from './user-table-list.component';

describe('UserTableListComponent', () => {
  let component: UserTableListComponent;
  let fixture: ComponentFixture<UserTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTableListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
