import { getFinanceData, addAccounts } from "~/common/utilities";
import moment from "moment";

describe("getFinanceData", () => {
  it("should return correct object", () => {
    const results = getFinanceData(
      10,
      10000,
      800,
      15,
      moment("2017-04-01", "YYYY-MM-DD")
    );
    expect(results[0]).toEqual({
      date: "Apr 2018",
      formattedInterest: "1,583.37",
      formattedTotalInterest: "1,583.37",
      formattedvalue: "21,183.37",
      interest: 1583.37,
      totalInterest: 1583.37,
      utc: 1522537200000,
      value: 21183.37
    });
    expect(results[results.length - 1]).toEqual({
      date: "Mar 2032",
      formattedInterest: "35,488.42",
      formattedTotalInterest: "224,878.68",
      formattedvalue: "378,878.68",
      interest: 35488.42,
      totalInterest: 224878.68,
      utc: 1964386800000,
      value: 378878.68
    });
  });
});

const getDate = d => {
  return moment(d, "YYYY-MM-DD")
    .utc()
    .valueOf();
};
describe("addAccounts", () => {
  it("should return correct object", () => {
    const results = addAccounts([
      {
        name: "HSBC ISA",
        account: [
          [getDate("2017-04-01"), 1000],
          [getDate("2017-04-15"), 3000],
          [getDate("2017-04-25"), 5000]
        ]
      }
    ]);
    expect(results).toEqual({
      account: [
        { date: 1491001200000, diff: 0, index: 0, total: 1000, value: 1000 },
        { date: 1492210800000, diff: 2000, index: 0, total: 3000, value: 3000 },
        { date: 1493074800000, diff: 2000, index: 0, total: 5000, value: 5000 }
      ],
      chart: [
        [1491001200000, 1000],
        [1492210800000, 3000],
        [1493074800000, 5000]
      ],
      name: "Combined savings"
    });
  });

  it("should return correct object when more than one account supplied", () => {
    const results = addAccounts([
      {
        name: "HSBC ISA",
        account: [
          [getDate("2017-04-01"), 1000],
          [getDate("2017-04-15"), 3000],
          [getDate("2017-04-25"), 5000]
        ]
      },
      {
        name: "HALIFAX ISA",
        account: [
          [getDate("2017-04-08"), 500],
          [getDate("2017-04-19"), 750],
          [getDate("2017-04-28"), 1000]
        ]
      }
    ]);
    expect(results).toEqual({
      account: [
        { date: 1491001200000, diff: 0, index: 0, total: 1000, value: 1000 },
        { date: 1491606000000, diff: 0, index: 1, total: 1500, value: 500 },
        { date: 1492210800000, diff: 2000, index: 0, total: 3500, value: 3000 },
        { date: 1492556400000, diff: 250, index: 1, total: 3750, value: 750 },
        { date: 1493074800000, diff: 2000, index: 0, total: 5750, value: 5000 },
        { date: 1493334000000, diff: 250, index: 1, total: 6000, value: 1000 }
      ],
      chart: [
        [1491001200000, 1000],
        [1491606000000, 1500],
        [1492210800000, 3500],
        [1492556400000, 3750],
        [1493074800000, 5750],
        [1493334000000, 6000]
      ],
      name: "Combined savings"
    });
  });
});
