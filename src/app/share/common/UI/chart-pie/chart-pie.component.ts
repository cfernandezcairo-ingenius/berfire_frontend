import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartTypeRegistry } from 'chart.js';
import { BaseChartDirective, ThemeService } from 'ng2-charts';
import { MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';


@Component({
  selector: 'app-chart-pie',
  standalone: true,
  imports: [BaseChartDirective, CommonModule,MatCard, MatCardHeader, MatCardSubtitle, MatCardTitle, MatCardActions],
  templateUrl: './chart-pie.component.html',
  styleUrl: './chart-pie.component.scss'
})
export class ChartPieComponent implements OnInit {

  //@Input() chartData: any;
  //@Input() chartOptions: any;
  //bar, radar, pie , polarArea, doughnut, bubble and scatter
  @Input() data: any;
  title = '';
  darkMode = false;

  constructor() {}
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  ngOnInit(): void {
  }


}
