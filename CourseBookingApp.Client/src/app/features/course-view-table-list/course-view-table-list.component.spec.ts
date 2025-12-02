import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseViewTableListComponent } from './course-view-table-list.component';

describe('CourseViewTableListComponent', () => {
  let component: CourseViewTableListComponent;
  let fixture: ComponentFixture<CourseViewTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseViewTableListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseViewTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
