import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import {HttpClientTestingModule , HttpTestingController} from '@angular/common/http/testing';
describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports :[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
