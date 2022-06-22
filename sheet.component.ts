import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  convertedJson!:string;
  fileUpload(event:any){
    console.log(event.target.files)
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload =(event:any) =>{
      console.log(event);
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData, {type:'binary'});
      workbook.SheetNames.forEach(sheet=>{
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
        console.log(data);
        this.convertedJson = JSON.stringify(data,undefined,4)
        
      })
      

      console.log(workbook)
    }    
  }
  download(content:any,fileName:string){
    const a = document.createElement("a");
    const file = new Blob([content]);
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }
  onDownload(){
    this.download(this.convertedJson,"json-file.json")
  }
  
}