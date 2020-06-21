import { TestBed } from '@angular/core/testing';

import { QuackamoleService } from './quackamole.service';

describe('QuackamoleService', () => {
  let service: QuackamoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuackamoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
