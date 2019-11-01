import { TestBed } from '@angular/core/testing';

import { Libro.ServiceService } from './libro.service.service';

describe('Libro.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Libro.ServiceService = TestBed.get(Libro.ServiceService);
    expect(service).toBeTruthy();
  });
});
