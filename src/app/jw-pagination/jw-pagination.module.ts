import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JwPaginationComponent } from './jw-pagination.component';
import { TqcAnswerModule } from '../tqc-answer/tqc-answer.module';

@NgModule({
    imports: [CommonModule],
    declarations: [JwPaginationComponent],
    exports: [JwPaginationComponent]
})
export class JwPaginationModule { }