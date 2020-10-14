import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public data = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#ff0aad',
                '#5252d1',
                '#f75252',
                '#42f551',
            ],
        }
    ],
    labels: []
};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://localhost:3000/budget')
    .subscribe((res: any) => {

      for (let i = 0; i < res.length; i++) {
        this.data.datasets[0].data[i] = res[i].budget;
        this.data.labels[i] = res[i].title;
    }
      this.createChart();
});
  }

  createChart() {
    var ctx = document.getElementById('myChart');
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.data
    });
};

}
