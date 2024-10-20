// import {
//   ApexChart,
//   ApexDataLabels,
//   ApexNonAxisChartSeries,
//   ApexPlotOptions,
//   ApexTheme,
// } from 'ng-apexcharts';

// export const PIE_GRAPHIC = {
//   chart: {
//     type: 'pie',
//     height: 400,
//   } as ApexChart,
//   labels: [] as string[],
//   series: [] as ApexNonAxisChartSeries,
// };

// export const DONUT_GRAPHIC = {
//   series: [44, 55, 13, 43, 22],
//   chart: {
//     type: 'donut',
//   },
//   labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
//   responsive: [
//     {
//       breakpoint: 480,
//       options: {
//         chart: {
//           width: 200,
//         },
//         legend: {
//           position: 'bottom',
//         },
//       },
//     },
//   ],
// };

// export const VERTICAL_BAR = {
//   theme: {
//     mode: 'dark',
//   } as ApexTheme,
//   chart: {
//     type: 'bar',
//     height: 400,
//     background: 'var(--secondary-bg)',
//   } as ApexChart,
//   plotOptions: {
//     bar: {
//       borderRadius: 5,
//       dataLabels: {
//         position: 'top', // top, center, bottom
//       },
//     },
//   } as ApexPlotOptions,
//   dataLabels: {
//     enabled: true,
//     offsetY: -20,
//     style: {
//       fontSize: '12px',
//       colors: ['#fff'],
//     },
//   } as ApexDataLabels,
// };

// export const HORIZONTAL_BAR = {
//   ...VERTICAL_BAR,
//   plotOptions: {
//     ...VERTICAL_BAR.plotOptions,
//     bar: {
//       ...VERTICAL_BAR.plotOptions.bar,
//       horizontal: true,
//     },
//   },
//   dataLabels: {
//     ...VERTICAL_BAR.dataLabels,
//     offsetX: 40,
//     offsetY: 0,
//     style: {
//       ...VERTICAL_BAR.dataLabels.style,
//     },
//   },
// };
