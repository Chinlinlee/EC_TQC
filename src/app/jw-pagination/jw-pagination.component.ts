import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
const paginate = require("node_modules/jw-paginate/lib/jw-paginate"); 
import * as $ from 'jquery';
import * as _ from 'lodash';
@Component({
  selector: 'jw-pagination',
  template: `<ul *ngIf="pager.pages && pager.pages.length" class="pagination">
  <li [ngClass]="{disabled:pager.currentPage === 1}" class="page-item first-item">
      <a (click)="setPage(1);" class="page-link">First</a>
  </li>
  <li [ngClass]="{disabled:pager.currentPage === 1}" class="page-item previous-item">
      <a (click)="setPage(pager.currentPage - 1)" class="page-link">Previous</a>
  </li>
  <li *ngFor="let page of pager.pages" [ngClass]="{active:pager.currentPage === page}" class="page-item number-item">
      <a (click)="setPage(page)" class="page-link">{{page}}</a>
  </li>
  <li [ngClass]="{disabled:pager.currentPage === pager.totalPages}" class="page-item next-item">
      <a (click)="setPage(pager.currentPage + 1)" class="page-link">Next</a>
  </li>
  <li [ngClass]="{disabled:pager.currentPage === pager.totalPages}" class="page-item last-item">
      <a (click)="setPage(pager.totalPages)" class="page-link">Last</a>
  </li>
  <li [ngClass]="{disabled:pager.currentPage === pager.totalPages}" class="page-item last-item">
  </li>
</ul>
<div class="form-group">
  <label for="txtInput">請輸入頁數：</label>
  <input type="text"
      class="form-control form-control-sm" name="txtInput" id="txtInput" placeholder="please input page number" [(ngModel)]="pager.currentPage"  inputmode="numeric" (keypress)="changePageOnKeyPress($event)">
      <button type="button" class="btn btn-primary btn-sm btn-block" (click)="changePageOnInputChange(pager.currentPage);">跳頁</button>
</div>`
})


export class JwPaginationComponent implements OnInit , OnChanges {

    @Input() items: Array<any>;
    @Output() changePage = new EventEmitter<any>(true);
    @Input() initialPage = 1;
    @Input() pageSize = 10;
    @Input() maxPages = 10;
    @Input() routeUri = "";
    pager: any = {};

    ngOnInit() {
        // set page if items array isn't empty
        if (this.items && this.items.length) {
            this.setPage(this.initialPage);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        // reset page if items array has changed
        try {
          if (changes.items.currentValue !== changes.items.previousValue) {
            this.setPage(this.initialPage);
          }
        } catch(e) {}
    }

    setPage(page: number) {
        page = Math.floor(page);
        // get new pager object for specified page
        this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages);
        
        // get new page of items from items array
        let pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
        // call change page function in parent component
        pageOfItems["nowPage"] = page;
        this.changePage.emit(pageOfItems);
        $('body,html').animate({
          scrollTop: 0
        }, 600);
        //document.body.scrollTop = 0; // For Safari
        //document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    changePageOnInputChange(page: number) {
      if (page && page !=0) {
        this.setPage(Number(page));
      }
    }
    changePageOnKeyPress (event : KeyboardEvent) {
      console.log(event.key);
      if (event.key == "Enter") {
        this.changePageOnInputChange(this.pager.currentPage);
      }
    }
}
