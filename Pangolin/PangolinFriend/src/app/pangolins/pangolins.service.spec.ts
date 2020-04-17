/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PangolinsService } from './pangolins.service';

describe('Service: Pangolins', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PangolinsService]
    });
  });

  it('should ...', inject([PangolinsService], (service: PangolinsService) => {
    expect(service).toBeTruthy();
  }));
});
