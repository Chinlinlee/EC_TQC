import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TqcAnswerComponent } from './tqc-answer/tqc-answer.component';
import { TqcExamComponent } from './tqc-exam/tqc-exam.component';
import { TqcExamResultComponent } from './tqc-exam-result/tqc-exam-result.component';
import { TqcExamChooseComponent } from './tqc-exam-choose/tqc-exam-choose.component';

const routes: Routes = [
  { path: '' , component : TqcAnswerComponent} ,
  { path: 'tqc-answer'  , component : TqcAnswerComponent} ,
  { path: 'tqc-answer/:id'  , component : TqcAnswerComponent} ,
  { path: 'tqc-exam' , component : TqcExamComponent} ,
  { path: 'tqc-exam/:id' , component : TqcExamComponent} ,
  { path : 'tqc-exam-result' , component : TqcExamResultComponent} ,
  { path : 'choose-tqc-exam' , component : TqcExamChooseComponent} ,
  { path: '**', redirectTo: '/tqc-answer' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes , { onSameUrlNavigation: 'reload' ,initialNavigation: "enabled" , useHash: false ,scrollPositionRestoration: "top"}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
