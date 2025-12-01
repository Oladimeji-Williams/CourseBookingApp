import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewTableComponent } from './user-view-table.component';

describe('UserViewTableComponent', () => {
  let component: UserViewTableComponent;
  let fixture: ComponentFixture<UserViewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserViewTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
