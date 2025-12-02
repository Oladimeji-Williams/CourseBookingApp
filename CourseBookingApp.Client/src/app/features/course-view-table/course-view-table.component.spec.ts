import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseViewTableComponent } from './course-view-table.component';

describe('CourseViewTableComponent', () => {
  let component: CourseViewTableComponent;
  let fixture: ComponentFixture<CourseViewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseViewTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
