import { Component, Input, OnInit } from '@angular/core';
import { MDCardComponent } from "../share/common/UI/md-card/md-card.component";
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth/auth.service';
import { StyleManager } from '../share/services/style-manager.service';
import { CommonModule } from '@angular/common';
import { ChartPieComponent } from '../share/common/UI/chart-pie/chart-pie.component';
import { ChartBarComponent } from '../share/common/UI/chart-bar/chart-bar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MDCardComponent, CommonModule, ChartPieComponent, ChartBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  darkMode = false;
  pieChart = {
    chartOptions: {
      responsive: false,
    },
    chartLabels: [ [ 'Download', 'Sales' ], ['Store', 'Sales' ], 'Mail Sales' ],
    chartDatasets: [ {
      data: [ 300, 500, 100 ]
    } ],
    chartLegend: true,
    chartPlugins:[],
    type: 'pie'
  }

  barChart = {
    chartData: {
      labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
      datasets: [
        { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
        { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
      ]
    },
    chartOptions: {
      responsive: false,
    },
    chartLegend: true,
    chartPlugins: [],
    type: 'bar'
  }

  constructor(
    public translate: TranslateService,
    private darkModeService: StyleManager,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe(dark => {
      this.darkMode = dark;
    });
  }
}