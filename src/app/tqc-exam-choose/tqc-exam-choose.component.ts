import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TqcExamChooseService } from './tqc-exam-choose.service';
import * as _ from 'lodash';
import { SimpleChanges } from '@angular/core';
import * as $ from 'jquery';
import { AppService } from '../app.service';
import { BlockUI  , NgBlockUI} from 'ng-block-ui';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Component({
  templateUrl: './tqc-exam-choose.component.html',
  styleUrls: ['./tqc-exam-choose.component.css']
})
export class TqcExamChooseComponent implements OnInit {
  chooseCategory : Object;
  examNum : Number;
  examNumError : Boolean;
  chooseCategoryError : Boolean;
  chooseNumError : Boolean = false;
  chooseNum : number;
  categoryNumObj : Object = {
    "first"   : 0 ,
    "second"  : 0 ,
    "thirth"  : 0 ,
    "fourth"  : 0 ,
    "fifth"   : 0 ,
    "sixth"   : 0 ,
    "seventh" : 0 ,
    "eight"   : 0 ,
    "all"     : 0
  };
  @BlockUI() blockUI : NgBlockUI;
  constructor(private router : Router , private TqcExanChooseService : TqcExamChooseService , private appService : AppService) { }

  async ngOnInit(): Promise<void> {
    this.blockUI.start("Loading");
    this.examNumError = false;
    this.chooseCategoryError = true;
    this.examNum = 0;
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
    console.log("test");
   /* setTimeout(()=> {
      this.blockUI.stop();
    } , 1000);*/
    of(true).pipe(
      delay(1500)
    ).subscribe(()=>{
      this.blockUI.reset();
    });
  }
  async ngAfterViewInit(): Promise<void> {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.categoryNumObj = {
      "first"     : await this.appService.getFirstCategoryNum()  ,
      "second"    : await this.appService.getSecondCategoryNum() ,
      "thirth"    : await this.appService.getThirthCategoryNum() ,
      "fourth"    : await this.appService.getFourthCategoryNum() ,
      "fifth"     : await this.appService.getFifthCategoryNum()  ,
      "sixth"     : await this.appService.getSixthCategoryNum()  ,
      "seventh"   : await this.appService.getSeventhCategoryNum(),
      "eighth"    : await this.appService.getEighthCategoryNum() ,
      "all"       : await this.appService.getExamNum()
    }
  }
  ngOnExamNumChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.chooseNumError = false;
    this.examNum = Number(this.examNum);
    if (!_.isNumber(this.examNum) || this.examNum <= 0 || _.isNaN(this.examNum)) {
      this.examNumError = true;
    } else {
      this.examNumError = false;
    }
  }
  ngOnChooseCategoryChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    let item = _.pickBy(this.chooseCategory , v=>!v);
    console.log(item);
    
    if (Object.keys(item).length == 1 && item["all"] == false) {
      this.chooseCategory["all"] = true;
    } else {
      this.chooseCategory["all"] = false;
    }
    let checkedItem = _.pickBy(this.chooseCategory , v=>v);
    if (!_.isEmpty(checkedItem)) {
      this.chooseCategoryError = false;
    } else {
      this.chooseCategoryError = true;
    }
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
    let checkedItem = _.pickBy(this.chooseCategory , v=>v);
    if (!_.isEmpty(checkedItem)) {
      this.chooseCategoryError = false;
    } else {
      this.chooseCategoryError = true;
    }
  }
  async goToExam() {
    let item = _.pickBy(this.chooseCategory , v=>v);
    if (!_.isNumber(this.examNum) || this.examNum <= 0 || _.isNaN(this.examNum)) { 
      this.examNumError = true;
      $('#inputExamNum').trigger('focus');
      return;
    }
    if (_.isEmpty(item)) {
      this.chooseCategoryError = true;
      return;
    }
    
    
    let keymap = {
      "one"   : this.appService.getFirstCategoryExam() , 
      "two"   : this.appService.getSecondCategoryExam(),
      "three" : this.appService.getThirdCategoryExam() ,
      "four"  : this.appService.getFourthCategoryExam() ,
      "five"  : this.appService.getFifthCategoryExam() ,
      "six"   : this.appService.getSixthCategoryExam() ,
      "seven" : this.appService.getSeventhCategoryExam() ,
      "eight" : this.appService.getEighthCategoryExam() ,
      "all"   : []
    }
    //this.appService.getFifthCategoryExam();
    let choosedNum = [];
    for (let key in this.chooseCategory) {
      if (this.chooseCategory[key]) {
        choosedNum.push(keymap[key]);
      }
    }
    let data = [];
    for (let i = 0 ; i < choosedNum.length ; i++) {
      let specificItem = await choosedNum[i];
      data.push(...specificItem);
    }
    console.log(data.length);
    this.chooseNum = data.length;
    if (this.examNum > this.chooseNum) {
      this.chooseNumError = true;
      $('#inputExamNum').trigger('focus');
      return;
    }
    data = _.shuffle(data);
    data = _.slice(data , 0 , this.examNum);
    console.log(data);
    this.TqcExanChooseService.data = data;
    //let data = await this.appService.getExam();
    this.router.navigate(['tqc-exam']);
    //this.TqcExanChooseService.chooseCategory = this.chooseCategory;
    
  }
  test () {
    let item = _.pickBy(this.chooseCategory , v=>v);
    console.log(item);
  }
}
