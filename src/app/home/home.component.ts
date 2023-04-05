import { Component, OnInit } from '@angular/core';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { DatePipe } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  props = constantsProps;
  currentUserName: String ;
  currentUserEmail: String ; 
  currentDateTime: any;

  chartdata: any;

  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];

  constructor(public datepipe: DatePipe) { }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser != null) {
      this.currentUserName = currentUser.currentUserName;
      this.currentUserEmail = currentUser.currentUserEmail;
      this.currentDateTime = this.datepipe.transform((new Date), 'MMMM d, y h:mm a');
      this.labeldata = ['Active', 'Inactive'];
      this.colordata = ['#16A085', '#F0B27A'];
      this.realdata = ['200', '300'];
      // let year = 2001;
      // let amount = 100;
      // for(let i=0; i<4 ;i++){
      //   this.labeldata.push(year);
      //   year+=1;
      //   this.realdata.push(amount);
      //   amount+=1;
      //   this.colordata.push('red');
      // }
      this.RenderChart(this.labeldata,this.realdata,this.colordata,'pie','piechart');
    }
  }

  RenderChart(labeldata:any,maindata:any,colordata:any,type:any,id:any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [{
          label: '# of Datasets',
          data: maindata,
          backgroundColor: colordata,
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      }
    });
  }
}
