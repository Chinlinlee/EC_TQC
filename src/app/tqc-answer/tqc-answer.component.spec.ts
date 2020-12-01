import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TqcAnswerComponent } from './tqc-answer.component';

describe('TqcAnswerComponent', () => {
  let component: TqcAnswerComponent;
  let fixture: ComponentFixture<TqcAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TqcAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TqcAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
