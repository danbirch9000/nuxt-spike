const Finance = require('financejs')
const moment = require('moment')

module.exports = {
  writeToPage: (message) => {
    return message;
  },
  getFinanceData: function(rate, amount, monthly, years, startDate) {
    if (rate == '' || amount == '' || monthly == '' || years == ''){
      return [];
    }

    rate = parseFloat(rate);
    amount = parseFloat(amount);
    monthly = parseFloat(monthly);
    years = parseFloat(years);

    var savingsObject = utilities.calculateSavings(amount, years, monthly, rate, startDate);
    return savingsObject;
  },
  calculateSavings: (initialAmount, years, monthly, rate, moment) => {
    var finance = new Finance();
    var amount = initialAmount;
    var data = [];
    for (var index = 0; index < years; index++) {
      var x = module.exports.getCiforYear(amount, index, monthly, rate, moment.add('years', 1));
      data.push(x);
      var interest = x.value - amount;
      amount = amount + interest;
    }
    return data;
  },

  getCiforYear: (amount, year, monthly, rate, time) => {
    var finance = new Finance();
    var init = amount + monthly;
    var value = 0;
    for (var index = 0; index < 12; index++) {
      value = finance.CI(rate/12, 1, init, 1);// rate, compoundings per period, principal, number of periods
      init = value + monthly;
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
