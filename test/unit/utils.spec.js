import { getAccountsForGoal } from "~/config/utils";

describe("getAccountsForGoal", () => {
  it("should return", () => {
    let accounts = [
      {
        history: [
          {
            uid: "111111",
            date: "04/29/2018 2:25 PM",
            value: "22.80"
          }
        ],
        name: "Stocks and Shares ISA",
        id: "123456"
      },
      {
        history: [
          {
            uid: "222222",
            date: "04/29/2018 2:25 PM",
            value: "12.11"
          }
        ],
        name: "SIPP",
        id: "1234567"
      }
    ];
    const result = getAccountsForGoal(["123456"], accounts);
    console.log(result);
    expect(result).toEqual("");
  });
});
