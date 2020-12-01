import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: './tqc-exam-result.component.html',
    styleUrls: ['./tqc-exam-result.component.css']
})
export class TqcExamResultComponent implements OnInit {
    resultData: Array<any>;
    cloneData : Array<any>;
    pageOfItems: Array<any>;
    isShowOnlyErrorAns : Boolean ;
    constructor(private appService: AppService, private router: Router , private titleService : Title) { }
    ngOnInit(): void {
        this.titleService.setTitle("電子商務TQC---練習題解答");
        this.resultData = this.appService.data;
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