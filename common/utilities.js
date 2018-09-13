const Finance = require("financejs");
const moment = require("moment");

var UtilitiesModule = (function() {
  var getFinanceData = function(rate, amount, monthly, years, startDate) {
    if (rate === "" || amount === "" || monthly === "" || years === "") {
      return [];
    }
    rate = parseFloat(rate);
    amount = parseFloat(amount);
    monthly = parseFloat(monthly);
    years = parseFloat(years);
    return this.calculateSavings(amount, years, monthly, rate, startDate);
  };

  var getFinancialData = function(payload) { //eslint-disable-line
    let { rate, amount, monthly, years, startDate } = payload;
    if (rate === "" || amount === "" || monthly === "" || years === "") {
      return [];
    }
    rate = parseFloat(rate);
    amount = parseFloat(amount);
    monthly = parseFloat(monthly);
    years = parseFloat(years);
    return this.calculateSavings(amount, years, monthly, rate, startDate);
  };

  var calculateSavings = function(initialAmount, years, monthly, rate, date) {
    var time = moment(date);
    var amount = initialAmount;
    var data = [];
    for (var index = 0; index < years; index++) {
      var savingsForYear = this.getCiforYear(
        amount,
        index,
        monthly,
        rate,
        time.add("years", 1)
      );

      if (index === 0) {
        savingsForYear.totalInterest = savingsForYear.interest;
        savingsForYear.formattedTotalInterest = this.numberWithCommas(
          savingsForYear.interest
        );
      } else {
        var calcInterest =
          data[index - 1].totalInterest + savingsForYear.interest;
        savingsForYear.totalInterest = calcInterest;
        savingsForYear.formattedTotalInterest = this.numberWithCommas(
          calcInterest
        );
      }

      //savingsForYear.totalInterest = this.numberWithCommas(savingsForYear.totalInterest)

      data.push(savingsForYear);
      amount += savingsForYear.value - amount;
    }
    return data;
  };

  var getCiforYear = function(amount, year, monthly, rate, time) {
    var finance = new Finance();
    var principal = amount + monthly;
    var value = 0;
    for (var index = 0; index < 12; index++) {
      value = finance.CI(rate / 12, 1, principal, 1); // rate, compoundings per period, principal, number of periods
      principal = value + monthly;
    }
    var interest = value - (amount + monthly * 12);

    return {
      value: value,
      formattedvalue: this.numberWithCommas(value),
      date: time.format("MMM YYYY"),
      utc: time.utc().valueOf(),
      interest: interest,
      formattedInterest: this.numberWithCommas(interest)
    };
  };

  var getCiForMonths = function(amount, months, monthly, rate) {
    var finance = new Finance();
    var principal = amount + monthly;
    var value = 0;
    for (var index = 0; index < months; index++) {
      value = finance.CI(rate / 12, 1, principal, 1); // rate, compoundings per period, principal, number of periods
      principal = value + monthly;
    }
    var interest = value - (amount + monthly * months);

    return {
      value: value,
      formattedvalue: this.numberWithCommas(value),
      interest: interest,
      formattedInterest: this.numberWithCommas(interest)
    };
  };

  var roundToTwo = function(num) {
    return Math.round(num * 100) / 100;
  };

  var buildChartData = function(data) {
    var chartData = [];
    for (var i = 0; i < data.length; i++) {
      chartData.push([data[i].utc, data[i].value]);
    }
    return chartData;
  };

  var numberWithCommas = function(x) {
    let value = this.roundToTwo(x);
    value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return value;
  };

  var addAccounts = function(payload) {
    let total = { name: "Combined savings", account: [] };

    payload.forEach((acc, i) => {
      acc.account.forEach((data, j) => {
        let diff = 0;
        if (j > 0) {
          diff = data[1] - acc.account[j - 1][1];
        }
        let temp = {
          date: data[0],
          value: data[1],
          index: i,
          diff: diff
        };
        total.account.push(temp);
      });
    });

    total.account.sort((a, b) => parseFloat(a.date) - parseFloat(b.date));
    let usedAccounts = [];
    total.account.forEach((data, i) => {
      if (i === 0) {
        data.total = data.value;
      } else {
        if (!usedAccounts.some(val => val === data.index)) {
          data.total = total.account[i - 1].total + data.value;
        } else {
          data.total = total.account[i - 1].total + data.diff;
        }
      }
      usedAccounts.push(data.index);
    });

    total.chart = [];
    total.account.forEach(data => {
      let temp = [data.date, Number(data.total.toFixed(2))];
      total.chart.push(temp);
    });

    return total;
  };

  return {
    getFinanceData: getFinanceData,
    calculateSavings: calculateSavings,
    getCiforYear: getCiforYear,
    roundToTwo: roundToTwo,
    buildChartData: buildChartData,
    numberWithCommas: numberWithCommas,
    getCiForMonths: getCiForMonths,
    addAccounts
  };
})();

module.exports = UtilitiesModule;
