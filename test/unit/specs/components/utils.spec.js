import { getAccountsForGoal } from "~/common/utils";

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
    expect(result).toEqual([
      {
        history: [
          { date: "04/29/2018 2:25 PM", uid: "111111", value: "22.80" }
        ],
        id: "123456",
        name: "Stocks and Shares ISA"
      }
    ]);
  });
});
