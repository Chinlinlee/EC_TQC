import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwPaginationComponent } from '../jw-pagination/jw-pagination.component';
import {ExcelBodyComponent} from '../excel-body/excel-body.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule , 
    JwPaginationComponent ,
    ExcelBodyComponent
  ]
})
export class TqcAnswerModule { }
