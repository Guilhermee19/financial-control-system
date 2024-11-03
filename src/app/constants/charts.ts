import {
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexStroke,
  ApexTheme,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
} from 'ng-apexcharts';

export const LINE_GRAPHIC = {
  theme: {
    mode: 'dark',
  } as ApexTheme,
  series: [
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }
  ],
  chart: {
    height: 350,
    background: 'var(--secondary-bg)',
    type: 'line',
    zoom: {
      enabled: false
    }
  } as ApexChart,
  dataLabels: {
    enabled: false
  } as ApexDataLabels,
  stroke: {
    curve: 'straight'
  } as ApexStroke,
  title: {
    text: 'Product Trends by Month',
    align: 'left'
  } as ApexTitleSubtitle,
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  } as ApexGrid,
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  } as ApexXAxis
};

export const PIE_GRAPHIC = {
  theme: {
    mode: 'dark',
  } as ApexTheme,
  chart: {
    type: 'pie',
    height: 400,
  } as ApexChart,
  labels: [] as string[],
  series: [] as ApexNonAxisChartSeries,
};

export const AREA_SPLINE = {
  theme: {
    mode: 'dark',
  } as ApexTheme,
  series: [
    {
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    }, {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41]
    }
  ],
  chart: {
    height: 350,
    type: 'area'
  } as ApexChart,
  dataLabels: {
    enabled: false
  } as ApexDataLabels,
  stroke: {
    curve: 'smooth'
  } as ApexStroke,
  xaxis: {
    type: 'datetime',
    categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
  } as ApexXAxis,
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    },
  } as ApexTooltip,
};

export const DONUT_GRAPHIC = {
  series: [44, 55, 13, 43, 22],
  chart: {
    type: 'donut',
  },
  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
};

export const VERTICAL_BAR = {
  theme: {
    mode: 'dark',
  } as ApexTheme,
  chart: {
    type: 'bar',
    height: 400,
    background: 'var(--secondary-bg)',
  } as ApexChart,
  plotOptions: {
    bar: {
      borderRadius: 5,
      dataLabels: {
        position: 'top', // top, center, bottom
      },
    },
  } as ApexPlotOptions,
  dataLabels: {
    enabled: true,
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ['#fff'],
    },
  } as ApexDataLabels,
};

export const HORIZONTAL_BAR = {
  ...VERTICAL_BAR,
  plotOptions: {
    ...VERTICAL_BAR.plotOptions,
    bar: {
      ...VERTICAL_BAR.plotOptions.bar,
      horizontal: true,
    },
  },
  dataLabels: {
    ...VERTICAL_BAR.dataLabels,
    offsetX: 40,
    offsetY: 0,
    style: {
      ...VERTICAL_BAR.dataLabels.style,
    },
  },
};
