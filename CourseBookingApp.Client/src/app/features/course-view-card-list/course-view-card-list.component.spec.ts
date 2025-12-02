import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseViewCardListComponent } from './course-view-card-list.component';

describe('CourseViewCardListComponent', () => {
  let component: CourseViewCardListComponent;
  let fixture: ComponentFixture<CourseViewCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseViewCardListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseViewCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
