import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseViewCardComponent } from './course-view-card.component';

describe('CourseViewCardComponent', () => {
  let component: CourseViewCardComponent;
  let fixture: ComponentFixture<CourseViewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseViewCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
