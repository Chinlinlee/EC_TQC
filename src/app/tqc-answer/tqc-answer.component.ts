import { Component, OnInit, ViewChild, ViewChildren , QueryList, AfterViewInit, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AppService } from '../app.service';
import { Router , ParamMap  , ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common' 
import { JwPaginationComponent } from '../jw-pagination/jw-pagination.component';
import { Title } from '@angular/platform-browser';
import {BlockUI , NgBlockUI} from 'ng-block-ui'
import * as $ from 'jquery';
import * as _ from 'lodash';

@Component({
  selector: 'app-tqc-answer',
  templateUrl: './tqc-answer.component.html',
  styleUrls: ['./tqc-answer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TqcAnswerComponent implements OnInit  {
  @BlockUI() blockUI : NgBlockUI;
  chooseCategory : Object;
  title = 'app';
  jsondata = [];
  data : any[] ;
  excelData : any[];
  pageOfItems: Array<any>;
  nowPage : Number;
  @ViewChildren(JwPaginationComponent) paginationChild : QueryList<JwPaginationComponent>;
  constructor(private appService : AppService , 
              private router : Router , 
              private route : ActivatedRoute ,  
              private location: Location ,  
              private titleService : Title,
              private appSerive: AppService,
              private cdr: ChangeDetectorRef
  ) {
    this.route.paramMap.subscribe( paramMap => {
        this.nowPage = Number(paramMap.get('id'));
        if (this.nowPage == 0) {
          this.nowPage = 1;
          this.location.go(`/tqc-answer/1`);
        }
        
        //console.log(this.nowPage);
        this.ngOnInit();
    });
  }

  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.blockUI.start("Loading...");
    $('body').css('overflow' , 'hidden');
    this.titleService.setTitle("電子商務TQC---題庫");
    let examData = await this.appService.getExam();
    //let merge = _.merge(_.keyBy(ansData , 'tno') , _.keyBy(examData ,'TNO'));
    //let values = _.values(merge);
    this.excelData = examData;
    this.data = _.cloneDeep(examData);
    this.nowPage = Number(this.route.snapshot.paramMap.get('id'));
    if (this.nowPage == 0) this.nowPage = 1;
    setTimeout(()=> {
      this.blockUI.stop();
      $('body').css('overflow' , 'auto');
    } , 1000)
    //console.log(this.nowPage);
    this.chooseCategory = {
      one   : false , 
      two   : false ,
      three : false ,
      four  : false ,
      five  : false ,
      six   : false ,
      seven : false ,
      eight : false ,
      all   : false
    };
    let userChooseCategoryLocalStorage  = JSON.parse(localStorage.getItem("chooseCategoryInAnswerPage"));
    if (userChooseCategoryLocalStorage) {
      for (let index in userChooseCategoryLocalStorage) {
        let category = userChooseCategoryLocalStorage[index];
        if (category === "true")  {
          category = true; 
        } else {
          category = false; 
        }
      }
      this.chooseCategory = userChooseCategoryLocalStorage;
    }
  }
  isAnswer(answer , index) {
    if  (answer.includes(index)) {
      return true;
    }
    return false;
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    console.log(pageOfItems);
    this.pageOfItems = pageOfItems;
    this.router.onSameUrlNavigation = 'reload';
    //this.router.navigate(['' , pageOfItems["nowPage"]], {relativeTo: this.route , queryParams: {id : pageOfItems["nowPage"]}});
    this.location.go(`/tqc-answer/${pageOfItems["nowPage"]}`);
  }
  goToExcelBody () : void {
    this.appService.setItem([1, 2 , 3]);
    this.router.navigate(['/excel-body']);
  }

  ngOnChooseCategoryChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    let item = _.pickBy(this.chooseCategory , v=>!v);
    if (Object.keys(item).length == 1 && item["all"] == false) {
      this.chooseCategory["all"] = true;
    } else {
      this.chooseCategory["all"] = false;
    }
    this.refreshExamByChosen();
    localStorage.setItem("chooseCategoryInAnswerPage", JSON.stringify(this.chooseCategory));
  }
  ngOnChooseCategoryAllChange (changes : SimpleChanges) : void {
    if (this.chooseCategory["all"] == true) {
      for (let key in this.chooseCategory) {
        this.chooseCategory[key] = true;
      } 
    } else {
      for (let key in this.chooseCategory) {
        this.chooseCategory[key] = false;
      } 
    }
    //this.refreshExamByChosen();
  }
  async refreshExamByChosen() : Promise<any> {
    let keymap = {
      "one"   : this.appService.getExamInCategory(1),
      "two"   : this.appService.getExamInCategory(2),
      "three" : this.appService.getExamInCategory(3) ,
      "four"  : this.appService.getExamInCategory(4) ,
      "five"  : this.appService.getExamInCategory(5) ,
      "six"   : this.appService.getExamInCategory(6) ,
      "seven" : this.appService.getExamInCategory(7) ,
      "eight" : this.appService.getExamInCategory(8) ,
      "all"   : (() => {return this.excelData})()
    }
    let chosenExam = [];
    for (let key in this.chooseCategory) {
      if (this.chooseCategory[key]) {
        chosenExam.push(keymap[key]);
      }
    }
    //this.data = [];
    let filterItem = [];
    for (let i = 0 ; i < chosenExam.length ; i++) {
      let specificItem = await chosenExam[i];
      filterItem.push(...specificItem);
    }
    this.data = filterItem;
  } 

}
