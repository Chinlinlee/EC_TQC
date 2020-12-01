import { Component , OnInit } from '@angular/core';
import { JwPaginationComponent } from './jw-pagination/jw-pagination.component';
import { AppService } from './app.service';
//npm install @types/lodash
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /*title = 'app';
  jsondata = [];
  data : any[] ;
  pageOfItems: Array<any>;
  readExcel () {
    console.log("haha");
  }
  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let ansData= await this.appService.getANS();
    let examData = await this.appService.getExam();
    //let merge = _.merge(_.keyBy(ansData , 'tno') , _.keyBy(examData ,'TNO'));
    //let values = _.values(merge);
    this.data = examData;
  }
  isAnswer(answer , index) {
    if  (answer.includes(index)) {
      return true;
    }
    return false;
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  //pagination https://jasonwatmore.com/post/2019/06/18/angular-8-simple-pagination-example */
}
