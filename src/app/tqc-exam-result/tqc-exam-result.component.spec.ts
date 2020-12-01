import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TqcExamResultComponent } from './tqc-exam-result.component';

describe('TqcExamResultComponent', () => {
  let component: TqcExamResultComponent;
  let fixture: ComponentFixture<TqcExamResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [
        RouterTestingModule ,
        HttpClientTestingModule
      ] ,
      declarations: [ TqcExamResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TqcExamResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
