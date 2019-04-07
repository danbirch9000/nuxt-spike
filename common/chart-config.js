export const chartSparkLineOptions = {
  chart: {
    type: "area",
    sparkline: {
      enabled: true
    },
    width: 100,
    height: 50
  },
  series: [
    {
      name: "Account value",
      data: null
    }
  ],
  tooltip: {
    fixed: {
      enabled: false
    },
    x: {
      show: false
    },
    y: {
      title: {
        formatter: () => "Value: "
      }
    },
    marker: {
      show: false
    }
  },
  xaxis: {
    type: "datetime"
  }
};

export const chartLineOptions = {
  chart: {
    type: "area"
  },
  dataLabels: {
    enabled: false
  },
  series: [
    {
      name: "Account value",
      data: null
    }
  ],
  tooltip: {
    y: {
      title: {
        formatter: () => "Value: "
      }
    }
  },
  xaxis: {
    type: "datetime"
  }
};
