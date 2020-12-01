import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TqcExamResultComponent } from './tqc-exam-result.component';

describe('TqcExamResultComponent', () => {
  let component: TqcExamResultComponent;
  let fixture: ComponentFixture<TqcExamResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
