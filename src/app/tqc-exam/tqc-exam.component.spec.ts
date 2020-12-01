import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TqcExamComponent } from './tqc-exam.component';

describe('TqcExamComponent', () => {
  let component: TqcExamComponent;
  let fixture: ComponentFixture<TqcExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
