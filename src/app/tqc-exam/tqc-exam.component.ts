import { Component, OnInit ,ViewChild  ,AfterViewInit,} from '@angular/core';
import { AppService } from '../app.service';
import { Router , ParamMap  , ActivatedRoute} from '@angular/router';
import { JwPaginationComponent } from '../jw-pagination/jw-pagination.component';
import * as _ from 'lodash';
import { Title } from '@angular/platform-browser';
import { TqcExamChooseService } from '../tqc-exam-choose/tqc-exam-choose.service';
import { BlockUI , NgBlockUI} from 'ng-block-ui';
@Component({
  templateUrl: './tqc-exam.component.html',
  styleUrls: ['./tqc-exam.component.css'] 
})
export class TqcExamComponent implements OnInit , AfterViewInit {
  title = 'app';
  data : any[] ;
  pageOfItems: Array<any>;
  @ViewChild(JwPaginationComponent) 
  private paginationChild : JwPaginationComponent;
  @BlockUI() blockUI : NgBlockUI
  constructor(private appService : AppService , private router : Router , private route : ActivatedRoute ,private tqcExamChooseSerive : TqcExamChooseService , private titleService : Title) { 
      
  }
  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.blockUI.start("Loading...");
    this.titleService.setTitle("電子商務TQC---練習題");
    let examData = this.tqcExamChooseSerive.data;
    //let merge = _.merge(_.keyBy(ansData , 'tno') , _.keyBy(examData ,'TNO'));
    //let values = _.values(merge);
    this.data =  examData;
    console.log(this.data );
    if (_.isUndefined(this.data)) {
      this.router.navigate(['/choose-tqc-exam']);
    }
    if (this.data.length <= 0)  {
      this.router.navigate(['/choose-tqc-exam']);
    }
    for (let item of this.data) {
      item.checkAnswer1 = false;
      item.checkAnswer2 = false;
      item.checkAnswer3 = false;
      item.checkAnswer4 = false;
      item.checkAnswer = false;
    }
    
    setTimeout(()=> {
      this.blockUI.stop();
    } , 1500);
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.route.paramMap.subscribe( paramMap => {
      //console.log(this.nowPage);
      
      let id = Number(paramMap.get('id'));
      console.log(id);
      if (id ==0) id = 1;
      if (this.paginationChild.items) {
        this.paginationChild.setPage(id);
      }
    });
  }

  isSingle (type) {
    let numberType = Math.floor(Number(type));
    if (numberType ==1 ) {
      return true;
    } 
    return false;
  }
  isMultiple (type) {
    let numberType = Math.floor(Number(type));
    if (numberType == 2) {
      return true;
    } 
    return false;
  }
  goToExamResult() {
    this.appService.data = this.data;
    this.router.navigate(['tqc-exam-result']);
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    this.router.navigate(['/tqc-exam' , pageOfItems["nowPage"]]);
  }
}
