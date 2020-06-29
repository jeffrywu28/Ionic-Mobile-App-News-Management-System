import { TestBed } from '@angular/core/testing';

import { GlobalNewsService } from './global-news.service';

describe('GlobalNewsService', () => {
  let service: GlobalNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
