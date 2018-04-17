const Finance = require('financejs')
const moment = require('moment')


var UtilitiesModule = (function () {

  var getFinanceData = function (rate, amount, monthly, years, startDate) {
    if (rate === '' || amount === '' || monthly === '' || years === ''){
      return [];
    }
    rate = parseFloat(rate);
    amount = parseFloat(amount);
    monthly = parseFloat(monthly);
    years = parseFloat(years);
    return this.calculateSavings(amount, years, monthly, rate, startDate);
  };

  var calculateSavings = function (initialAmount, years, monthly, rate, date) {
    var time = moment(date);
    var amount = initialAmount;
    var data = [];
    for (var index = 0; index < years; index++) {
      var savingsForYear = this.getCiforYear(amount, index, monthly, rate, time.add('years', 1));

      if (index === 0){
        savingsForYear.totalInterest = savingsForYear.interest;
      }else{
        savingsForYear.totalInterest = data[index - 1].totalInterest + savingsForYear.interest;
      }

      //savingsForYear.totalInterest = this.numberWithCommas(savingsForYear.totalInterest)

      data.push(savingsForYear);
      amount += (savingsForYear.value - amount);
    }
    return data;
  };

  var getCiforYear = function (amount, year, monthly, rate, time) {
    var finance = new Finance();
    var principal = amount + monthly;
    var value = 0;
    for (var index = 0; index < 12; index++) {
      value = finance.CI(rate/12, 1, principal, 1);// rate, compoundings per period, principal, number of periods
      principal = value + monthly;
    };
    var roundedVal = this.roundToTwo(value);
    return {
      value: roundedVal,
      formattedvalue: this.numberWithCommas(roundedVal),
      date: time.format('MMM YYYY'),
      utc: time.utc().valueOf(),
      interest: module.exports.roundToTwo(value - (amount + (monthly*12)))
    }
  };

  var roundToTwo = function (num) {
    return Math.round(num * 100) / 100;
  };

  var buildChartData = function (data) {
    var chartData = [];
    for (var i = 0; i < data.length; i++) {
      chartData.push([data[i].utc, data[i].value]);
    }
    return chartData;
  };

  var numberWithCommas = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return {
    getFinanceData: getFinanceData,
    calculateSavings: calculateSavings,
    getCiforYear: getCiforYear,
    roundToTwo: roundToTwo,
    buildChartData: buildChartData,
    numberWithCommas: numberWithCommas
  };

})();

module.exports = UtilitiesModule();
