import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';


@Component({
  selector: 'app-chart-pie',
  standalone: true,
  imports: [BaseChartDirective, CommonModule,MatCard, MatCardHeader, MatCardSubtitle, MatCardTitle, MatCardActions],
  templateUrl: './chart-pie.component.html',
  styleUrl: './chart-pie.component.scss'
})
export class ChartPieComponent {

  @Input() data: any;
  title = '';

  constructor() {}
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

}
