export const getAccountsForGoal = (ids, accounts) => {
  let a = [];

  ids.forEach(id => {
    const acc = accounts.find(o => o.id === id);
    a.push(acc);
  });

  return a;
};
