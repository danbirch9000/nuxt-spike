const Finance = require("financejs");
const moment = require("moment");

export default {};

export const getFinanceData = (rate, amount, monthly, years, startDate) => {
  if (rate === "" || amount === "" || monthly === "" || years === "") {
    return [];
  }
  rate = parseFloat(rate);
  amount = parseFloat(amount);
  monthly = parseFloat(monthly);
  years = parseFloat(years);
  return calculateSavings(amount, years, monthly, rate, startDate);
};

const calculateSavings = (initialAmount, years, monthly, rate, date) => {
  const time = moment(date);
  let data = [];
  for (let index = 0; index < years; index++) {
    let savingsForYear = getCiforYear(
      initialAmount,
      index,
      monthly,
      rate,
      time.add(1, "years")
    );

    if (index === 0) {
      savingsForYear.totalInterest = savingsForYear.interest;
      savingsForYear.formattedTotalInterest = numberWithCommas(
        savingsForYear.interest
      );
    } else {
      let calcInterest =
        data[index - 1].totalInterest + savingsForYear.interest;
      savingsForYear.totalInterest = calcInterest;
      savingsForYear.formattedTotalInterest = numberWithCommas(calcInterest);
    }

    data.push(savingsForYear);
    initialAmount += savingsForYear.value - initialAmount;
  }
  return data;
};

export const getFinancialData = payload => {
  //eslint-disable-line
  let { rate, amount, monthly, years, startDate } = payload;
  if (rate === "" || amount === "" || monthly === "" || years === "") {
    return [];
  }
  rate = parseFloat(rate);
  amount = parseFloat(amount);
  monthly = parseFloat(monthly);
  years = parseFloat(years);
  return calculateSavings(amount, years, monthly, rate, startDate);
};

const getCiforYear = (amount, year, monthly, rate, time) => {
  const finance = new Finance();
  let principal = amount + monthly;
  let value = 0;
  for (var index = 0; index < 12; index++) {
    value = finance.CI(rate / 12, 1, principal, 1);
    principal = value + monthly;
  }
  let interest = value - (amount + monthly * 12);

  return {
    value: value,
    formattedvalue: numberWithCommas(value),
    date: time.format("MMM YYYY"),
    utc: time.utc().valueOf(),
    interest: parseFloat(interest.toFixed(2)),
    formattedInterest: numberWithCommas(interest)
  };
};

export const getCiForMonths = (amount, months, monthly, rate) => {
  var finance = new Finance();
  var principal = amount + monthly;
  var value = 0;
  for (var index = 0; index < months; index++) {
    value = finance.CI(rate / 12, 1, principal, 1);
    principal = value + monthly;
  }
  var interest = value - (amount + monthly * months);

  return {
    value: value,
    formattedvalue: numberWithCommas(value),
    interest: interest,
    formattedInterest: numberWithCommas(interest)
  };
};

const roundToTwo = num => {
  return Math.round(num * 100) / 100;
};

export const buildChartData = data => {
  var chartData = [];
  for (var i = 0; i < data.length; i++) {
    chartData.push([data[i].utc, data[i].value]);
  }
  return chartData;
};

export const numberWithCommas = x => {
  let value = roundToTwo(x);
  value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return value;
};

export const addAccounts = payload => {
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
