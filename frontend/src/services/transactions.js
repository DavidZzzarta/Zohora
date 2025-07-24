export async function createServerTransaction({
  account_id,
  amount,
  description,
}) {
  let init = {
    method: "POST",
    body: JSON.stringify({ account_id, amount, description }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch("/transaction", init)
    .then((r) => r.json())
    .then((response) => {
      return response;
    })
    .catch((e) => "error");
}

export async function deleteServerTransaction({ transaction_id }) {
  let init = {
    method: "PATCH",
  };
  return fetch(`/transaction/${transaction_id}`, init)
    .then((r) => r.json())
    .then((response) => {
      return response;
    })
    .catch((e) => "error");
}

export function getLocalTransactions({ account_id /*, active*/ }) {
  let transactions = JSON.parse(localStorage.getItem("transactions"));
  let trans = transactions.filter((e) => e.account_id === account_id) ?? [];
  return trans;
}

export async function getServerTransactions({ account_id }) {
  return fetch(`/transaction/${account_id}`)
    .then((r) => r.json())
    .then((response) => {
      return response.transactions;
    })
    .catch((e) => "error");
}
