export const chartSparkLineOptions = {
  chart: {
    type: "area",
    sparkline: {
      enabled: true
    },
    height: 100
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
    type: "area",
    toolbar: {
      show: false
    }
  },
  stroke: {
    curve: "straight",
    width: 2
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
        formatter: () => "Value"
      }
    }
  },
  xaxis: {
    type: "datetime"
  },
  yaxis: {
    min: 0,
    forceNiceScale: true
  }
};
