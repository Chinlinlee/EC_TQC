import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';
@Injectable({
    providedIn: 'root'
})
export class AppService {
    data : Array<any>;
    constructor(private http: HttpClient) { }
    log(message: string) {
        console.log(message);
    }
    async getCSV(): Promise<any> {
        return new Promise((resolve) => {
            this.http.get("./assets/ANS.mdb.xls", {
                responseType: 'blob'
            }).subscribe(
                response => {
                    response.arrayBuffer().then((data) => {
                        return resolve(data);
                    })
                }
            );
        });
    }
    //https://www.onooks.com/angular-7-not-able-to-read-excel-file-from-assets-folder/
    async getANS() : Promise<any>{
        return await this.loadExcelFromUrl('./assets/ANS.mdb.xls');
    }
    async getExam() : Promise<any> {
        return await this.loadExcelFromUrl('./assets/EXAM.mdb.xls');
    }
    async getExamNum() : Promise<any> {
        let data = await this.getExam();
        return data.length;
    }
    async getExamInCategory(category: Number) : Promise<any>{
        let data = await this.getExam();
        data = _.filter(data, v=> v.TNO[3] == category);
        return data;
    }
    async getFirstCategoryExam() : Promise<any> {
        let data = await this.getExam();
        data = _.filter(data , v=> v.TNO[3] == 1)
        return data;
    }
    async getSecondCategoryExam() : Promise<any> {
        let data = await this.getExam();
        data = _.filter(data , v=> v.TNO[3] == 2)
        return data;
    }
    async getThirdCategoryExam() : Promise<any> {
        let data = await this.getExam();
        data = _.filter(data , v=> v.TNO[3] == 3)
        return data;
    }
    async getFourthCategoryExam() : Promise<any> {
        let data = await this.getExam();
        data = _.filter(data , v=> v.TNO[3] == 4)
        return data;
    }
    async getFifthCategoryExam() : Promise<any> {
        let data = await this.getExam();
        data = _.filter(data , v=> v.TNO[3] == 5)
        return data;
    }
    async getSixthCategoryExam() : Promise<any> {
        let data = await this.getExam();
        data = _.filter(data , v=> v.TNO[3] == 6)
        return data;
    }
    async getSeventhCategoryExam() : Promise<any> {
        let data = await this.getExam();
        data = _.filter(data , v=> v.TNO[3] == 7)
        return data;
    }
    async getEighthCategoryExam() : Promise<any> {
        let data = await this.getExam();
        data = _.filter(data , v=> v.TNO[3] == 8)
        return data;
    }
    async getFirstCategoryNum() : Promise<Number> {
        let data = await this.getExam();
        data = _.filter(data , v=> v.TNO[3] == 1)
        return data.length;
    }
    async getSecondCategoryNum() : Promise<Number> {
        let data = await this.getExam();
        data = _.filter(data , v=> v.TNO[3] == 2)
        return data.length;
    }
    async getThirthCategoryNum() : Promise<Number> {
        let data = await this.getExam();
        data = _.filter(data , v=> v.TNO[3] == 3)
        return data.length;
    }
    async getFourthCategoryNum() : Promise<Number> {
        let data = await this.getExam();
        data = _.filter(data , v=> v.TNO[3] == 4)
        return data.length;
    }
    async getFifthCategoryNum() : Promise<Number> {
        let data = await this.getExam();
        data = _.filter(data , v=> v.TNO[3] == 5)
        return data.length;
    }
    async getSixthCategoryNum() : Promise<Number> {
        let data = await this.getExam();
        data = _.filter(data , v=> v.TNO[3] == 6)
        return data.length;
    }
    async getSeventhCategoryNum() : Promise<Number> {
        let data = await this.getExam();
        data = _.filter(data , v=> v.TNO[3] == 7)
        return data.length;
    }
    async getEighthCategoryNum() : Promise<Number> {
        let data = await this.getExam();
        data = _.filter(data , v=> v.TNO[3] == 8)
        return data.length;
    }
    setItem(item : Array<any>) : void {
        this.data = item;
    }
    getItem() : Array<any> {
        return this.data;
    }
    private loadExcelFromUrl(url) : Promise<any> {
        return new Promise ((resolve , reject)=> {
            /* wire up file reader */
        this.http.get(url, { responseType: "blob" }).subscribe(data => {
            const reader: FileReader = new FileReader();
            reader.readAsBinaryString(data);
            reader.onload = (e: any) => {
                /* create workbook */
                const binarystr: string = e.target.result;
                const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: "binary" });

                /* selected the first sheet */
                const wsname: string = wb.SheetNames[0];
                const ws: XLSX.WorkSheet = wb.Sheets[wsname];

                /* save data */
                const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
             // Data will be logged in array format containing objects
                return resolve(data);
            };
        },
            error => {
                console.log(error);
                return reject(error);
            })
        })
    }
}
