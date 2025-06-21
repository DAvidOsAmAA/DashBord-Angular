import { Component, inject } from '@angular/core';
import { OverviewService } from '../../core/services/overview/overview.service';
import { CommonModule } from '@angular/common';
import { IOverall } from '../../shared/interfaces/Overview/IOverall';
import { ICategory } from '../../shared/interfaces/Overview/Icategory';

import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { IRevenue } from '../../shared/interfaces/Overview/IRevenue';
import { ChartModule } from 'primeng/chart';
import { IProduct } from '../../shared/interfaces/Overview/Iproduct';
@Component({
  selector: 'app-overview',
  imports: [CommonModule, CardModule, ScrollPanelModule, ChartModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  statistics!: IOverall;
  categories!: ICategory[];
  topSellingProducts!: IProduct[];
  lowStockProducts!: IProduct[];

  ordersChartData: any;
  ordersChartOptions: any;
  revenueChartData: any;
  revenueChartOptions: any;

  private _overviewService = inject(OverviewService);

  constructor() {}

  ngOnInit(): void {
    this.getOverAllStatistics();
    this.getStatistics();
    this.getOrders();
    this.getProducts();
    this.getCategories();
    this.initializeChart();
  }

  getStatistics() {
    this._overviewService.getStatistics().subscribe({
      next: (res: any) => {},
      error: (err) => {
        console.error(err);
      },
    });
  }

  getOverAllStatistics() {
    this._overviewService.getOverAll().subscribe({
      next: (res: any) => {
        this.statistics = res.statistics;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getOrders() {
    this._overviewService.getOrders().subscribe({
      next: (res: any) => {
        this.prepareOrdersChart(res.statistics.ordersByStatus);
        this.prepareMonthlyRevenueChart(res.statistics.monthlyRevenue);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  getCategories() {
    this._overviewService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.statistics;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  getProducts() {
    this._overviewService.getProducts().subscribe({
      next: (res: any) => {
        this.topSellingProducts = res.statistics.topSellingProducts;
        this.lowStockProducts = res.statistics.lowStockProducts;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // Chart Oprions

  initializeChart(): void {
    this.ordersChartOptions = {
      responsive: true,
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#6B7280', // Tailwind gray-500
          },
        },
      },
    };
    // this.revenueChartOptions = {
    //   responsive: true,
    //   maintainAspectRatio: false,
    //   plugins: {
    //     legend: { display: false },
    //     tooltip: {
    //       callbacks: {
    //         label: function (context: any) {
    //           return `${context.parsed.y.toLocaleString()} EGP`;
    //         },
    //       },
    //     },
    //     annotation: {
    //       annotations: {
    //         pointLabel: {
    //           type: 'label',
    //           xValue: labels[maxIndex],
    //           yValue: maxRevenue,
    //           content: [`${maxRevenue.toLocaleString()} EGP`],
    //           color: '#EC4899',
    //           font: {
    //             weight: 'bold',
    //             size: 12,
    //           },
    //           yAdjust: -20,
    //           backgroundColor: 'transparent',
    //         },
    //       },
    //     },
    //   },
    //   scales: {
    //     y: {
    //       beginAtZero: true,
    //       ticks: {
    //         callback: (value: number) => value.toLocaleString(),
    //       },
    //     },
    //   },
    // };
  }

  prepareOrdersChart(data: any[]): void {
    const filtered = data.filter((item) => item._id); // remove nulls

    const labels = filtered.map((item) => this.formatStatusLabel(item._id));
    const values = filtered.map((item) => item.count);
    const colors = filtered.map((item) => this.getStatusColor(item._id));

    this.ordersChartData = {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors,
        },
      ],
    };
  }
  formatStatusLabel(status: string): string {
    const map: Record<string, string> = {
      completed: 'Completed',
      inProgress: 'In Progress',
      canceled: 'Canceled',
      pending: 'Pending',
    };
    return map[status] || 'Unknown';
  }
  getStatusColor(status: string): string {
    const map: Record<string, string> = {
      completed: '#10B981', // green
      inProgress: '#3B82F6', // blue
      canceled: '#EF4444', // red
      pending: '#F59E0B', // amber
    };
    return map[status] || '#9CA3AF'; // gray fallback
  }

  prepareMonthlyRevenueChart(data: any[]): void {
    const sortedData = [...data].sort((a, b) => a._id.localeCompare(b._id));

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const labels = sortedData.map((item) => {
      const monthIndex = +item._id.split('-')[1] - 1;
      return monthNames[monthIndex];
    });

    const values = sortedData.map((item) => item.revenue);

    const maxRevenue = Math.max(...values);
    const maxIndex = values.indexOf(maxRevenue);

    this.revenueChartData = {
      labels,
      datasets: [
        {
          label: 'Revenue',
          data: values,
          fill: true,
          borderColor: '#EC4899', // pink-500
          tension: 0.4,
          pointRadius: values.map((_, i) => (i === maxIndex ? 6 : 0)),
          pointBackgroundColor: values.map((_, i) =>
            i === maxIndex ? '#EC4899' : 'transparent'
          ),
          backgroundColor: (ctx: any) => {
            const chart = ctx.chart;
            const { ctx: canvasCtx, chartArea } = chart;
            if (!chartArea) return null;

            const gradient = canvasCtx.createLinearGradient(
              0,
              chartArea.top,
              0,
              chartArea.bottom
            );
            gradient.addColorStop(0, 'rgba(236, 72, 153, 0.3)');
            gradient.addColorStop(1, 'rgba(236, 72, 153, 0)');
            return gradient;
          },
        },
      ],
    };

    this.revenueChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              return `${context.parsed.y.toLocaleString()} EGP`;
            },
          },
        },
        annotation: {
          annotations: {
            pointLabel: {
              type: 'label',
              xValue: labels[maxIndex],
              yValue: maxRevenue,
              content: [`${maxRevenue.toLocaleString()} EGP`],
              color: '#EC4899',
              font: {
                weight: 'bold',
                size: 12,
              },
              yAdjust: -20,
              backgroundColor: 'transparent',
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value: number) => value.toLocaleString(),
          },
        },
      },
    };
  }
}
