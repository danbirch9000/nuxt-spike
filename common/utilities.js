const Finance = require('financejs')
const moment = require('moment')

module.exports = {
  getFinanceData: function(rate, amount, monthly, years, startDate) {
    if (rate == '' || amount == '' || monthly == '' || years == ''){
      return [];
    }
    rate = parseFloat(rate);
    amount = parseFloat(amount);
    monthly = parseFloat(monthly);
    years = parseFloat(years);

    return utilities.calculateSavings(amount, years, monthly, rate, startDate);;
  },
  calculateSavings: (initialAmount, years, monthly, rate, moment) => {
    var amount = initialAmount;
    var data = [];
    for (var index = 0; index < years; index++) {
      var savingsForYear = module.exports.getCiforYear(amount, index, monthly, rate, moment.add('years', 1));
      data.push(savingsForYear);
      amount += (savingsForYear.value - amount);
    }
    return data;
  },

  getCiforYear: (amount, year, monthly, rate, time) => {
    var finance = new Finance();
    var principal = amount + monthly;
    var value = 0;
    for (var index = 0; index < 12; index++) {
      value = finance.CI(rate/12, 1, principal, 1);// rate, compoundings per period, principal, number of periods
      principal = value + monthly;
    };
    return {
      value: module.exports.roundToTwo(value),
      date: time.format('MMM YYYY'),
      utc: time.utc().valueOf(),
      interest: module.exports.roundToTwo(value - (amount + (monthly*12)))
    }
  },

  roundToTwo: (num) => {
    return Math.round(num * 100) / 100
  },

  buildChartData: (data) => {
    var chartData = [];
    for (var i = 0; i < data.length; i++) {
      chartData.push([data[i].utc, data[i].value]);
    }
    return chartData;
  }

}
