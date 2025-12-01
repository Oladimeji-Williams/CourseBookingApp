import { TestBed } from '@angular/core/testing';

import { CourseRepository } from './course.repository';

describe('CourseRepository', () => {
  let service: CourseRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
