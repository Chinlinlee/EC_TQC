import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';

import { AppComponent } from './app.component';
import { JwPaginationComponent } from './jw-pagination/jw-pagination.component';
import { TqcAnswerComponent } from './tqc-answer/tqc-answer.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { TqcExamComponent } from './tqc-exam/tqc-exam.component';
import { TqcExamResultComponent } from './tqc-exam-result/tqc-exam-result.component';
import { TqcExamChooseComponent } from './tqc-exam-choose/tqc-exam-choose.component';

import {HashLocationStrategy, Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    JwPaginationComponent,
    TqcAnswerComponent,
    TopBarComponent,
    TqcExamComponent,
    TqcExamResultComponent,
    TqcExamChooseComponent
  ],
  imports: [
    BlockUIModule.forRoot() ,
    BrowserModule,
    AppRoutingModule ,
    FormsModule , 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
