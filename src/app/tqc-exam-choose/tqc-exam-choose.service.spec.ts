import { TestBed } from '@angular/core/testing';

import { TqcExamChooseService } from './tqc-exam-choose.service';

describe('TqcExamChooseService', () => {
  let service: TqcExamChooseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TqcExamChooseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
