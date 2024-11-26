import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';


@Component({
  selector: 'app-chart-bar',
  standalone: true,
  imports: [BaseChartDirective, CommonModule,MatCard, MatCardHeader, MatCardSubtitle, MatCardTitle, MatCardActions],
  templateUrl: './chart-bar.component.html',
  styleUrl: './chart-bar.component.scss'
})
export class ChartBarComponent {

  @Input() data: any;
  title = '';
  darkMode = false;
  chartDatasets: any;
  chartLabels:any;
  chartOptions:any;
  chartPlugins:any;
  chartLegend:any;


  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };


  constructor() {}
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;


}
