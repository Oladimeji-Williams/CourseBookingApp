import { TestBed } from '@angular/core/testing';

import { CoursesRepository } from './courses.repository';

describe('CoursesRepository', () => {
  let service: CoursesRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
