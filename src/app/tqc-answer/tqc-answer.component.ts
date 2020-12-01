import { Component, OnInit, ViewChild, ViewChildren , QueryList } from '@angular/core';
import { AppService } from '../app.service';
import { Router , ParamMap  , ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common' 
import { JwPaginationComponent } from '../jw-pagination/jw-pagination.component';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-tqc-answer',
  templateUrl: './tqc-answer.component.html',
  styleUrls: ['./tqc-answer.component.css']
})
export class TqcAnswerComponent implements OnInit {
  title = 'app';
  jsondata = [];
  data : any[] ;
  pageOfItems: Array<any>;
  nowPage : Number;
  @ViewChildren(JwPaginationComponent) paginationChild : QueryList<JwPaginationComponent>;
  constructor(private appService : AppService , private router : Router , private route : ActivatedRoute , localtion: Location ,  private titleService : Title ) {
    this.route.paramMap.subscribe( paramMap => {
        this.nowPage = Number(paramMap.get('id'));
        if (this.nowPage == 0) this.nowPage = 1;
        //console.log(this.nowPage);
        this.ngOnInit();
    })
  }

  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.titleService.setTitle("電子商務TQC---題庫");
    let examData = await this.appService.getExam();
    //let merge = _.merge(_.keyBy(ansData , 'tno') , _.keyBy(examData ,'TNO'));
    //let values = _.values(merge);
    this.data = examData;
    this.nowPage = Number(this.route.snapshot.paramMap.get('id'));
    if (this.nowPage == 0) this.nowPage = 1;
    //console.log(this.nowPage);
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
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/tqc-answer' , pageOfItems["nowPage"]]);
  }
  goToExcelBody () : void {
    this.appService.setItem([1, 2 , 3]);
    this.router.navigate(['/excel-body']);
  }
}
