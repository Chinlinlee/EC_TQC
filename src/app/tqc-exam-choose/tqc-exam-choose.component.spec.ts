import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TqcExamChooseComponent } from './tqc-exam-choose.component';

describe('TqcExamChooseComponent', () => {
  let component: TqcExamChooseComponent;
  let fixture: ComponentFixture<TqcExamChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [
        RouterTestingModule , 
        HttpClientTestingModule
      ],
      declarations: [ TqcExamChooseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TqcExamChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
