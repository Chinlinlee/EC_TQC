import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Title } from '@angular/platform-browser';
import { BlockUI , NgBlockUI } from 'ng-block-ui';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
    templateUrl: './tqc-exam-result.component.html',
    styleUrls: ['./tqc-exam-result.component.css']
})
export class TqcExamResultComponent implements OnInit {
    resultData: Array<any>;
    cloneData : Array<any>;
    pageOfItems: Array<any>;
    isShowOnlyErrorAns : Boolean ;
    @BlockUI() blockUI : NgBlockUI;
    constructor(private appService: AppService, private router: Router , private titleService : Title) { }
    ngOnInit(): void {
        this.blockUI.start("Loading");
        this.titleService.setTitle("電子商務TQC---練習題解答");
        this.resultData = this.appService.data;
        try {
            for (let item of this.resultData) {
                item.checkAnswer = item.checkAnswer.toString();
                let type = Math.floor(Number(item.TYPE));
                if (type ==1 ){
                    if (item.ANSWER == item.checkAnswer) {
                        console.log("yes");
                        item.isRight = true;
                    }
                } else if (type ==2 ) {
                    let userAnswer = [];
                    for (let i = 1 ; i<=4 ; i++) {
                        if (item[`checkAnswer${i}`]) {
                            userAnswer.push(i);
                        }
                    }
                    if (item.ANSWER == userAnswer.join('')) {
                        console.log("yes");
                        item.isRight = true;
                    }
                } else {
                    item.isRight = false;
                }
            }
            this.cloneData = _.cloneDeep(this.resultData);
            this.isShowOnlyErrorAns = false;
            //of(true) obeservable
            //pipe(delay(1000)) operator
            //subscribetion
            //this.blockUI.stop() Observe
            of(true).pipe(delay(1000)).subscribe(()=> {
                this.blockUI.stop();
            });
            /*setTimeout(()=> {
                this.blockUI.stop();
            } , 1000);*/
        } catch (e) {
            if (e.message.includes('resultData')) {
                this.router.navigate(['choose-tqc-exam']);
            }
        }
    }
    onChangePage(pageOfItems: Array<any>) {
        // update current page of items
        this.pageOfItems = pageOfItems;
    }
    showOnlyErrorAns () {
        if (this.isShowOnlyErrorAns) {
            this.resultData = this.resultData.filter((v)=> {
                console.log(v.isRight);
                return !(v.isRight);
            });
        } else {
            this.resultData = this.cloneData;
        }
    }
    isAnswer(item , answer , index) {
        if (item.isRight == true) {
            return false;
        } 
        if (answer.includes(index)) {
            return true;
        }
        return false;
    }
    isMultipleAnswer (item) {
        let userAnswer = [];
        for (let i = 1 ; i<=4 ; i++) {
            if (item[`checkAnswer${i}`]) {
                userAnswer.push(i);
            }
        }
        if (item.ANSWER == userAnswer.join('')) return true;
        return false;
    }
    isSingle(type) {
        let numberType = Math.floor(Number(type));
        if (numberType == 1) {
            return true;
        }
        return false;
    }
    isMultiple(type) {
        let numberType = Math.floor(Number(type));
        if (numberType == 2) {
            return true;
        }
        return false;
    }
    isUserCheckAnswer (item , value) {
        if (item.checkAnswer == value) {
            return true;
        } else if (item[`checkAnswer${value}`]) {
            return true;
        }
        return false;
    }
}
