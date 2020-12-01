import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TqcExamComponent } from './tqc-exam.component';
import {HttpClientTestingModule , HttpTestingController} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
describe('TqcExamComponent', () => {
  let component: TqcExamComponent;
  let fixture: ComponentFixture<TqcExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [
        HttpClientTestingModule ,
        RouterTestingModule
      ] ,
      declarations: [ TqcExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TqcExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
