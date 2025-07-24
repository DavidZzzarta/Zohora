import { accounts as accts, transactions as trans } from "../mocks/db.js";

export async function createServerAccount({
  name,
  description,
  current_balance,
}) {
  let init = {
    method: "POST",
    body: JSON.stringify({ name, description, current_balance }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch("/account", init)
    .then((r) => r.json())
    .then((response) => {
      return response;
    })
    .catch((e) => "error");
}

export async function deleteServerAccount({ account_id }) {
  let init = {
    method: "DELETE",
  };
  return fetch(`/account/${account_id}`, init)
    .then((r) => r.json())
    .then((response) => {
      return response;
    })
    .catch((e) => "error");
}

export function getLocalAccounts() {
  let accounts = localStorage.getItem("accounts");
  if (!accounts) {
    localStorage.setItem("accounts", JSON.stringify(accts));
    localStorage.setItem("transactions", JSON.stringify(trans));
    return accts;
  } else {
    return JSON.parse(accounts);
  }
}

export async function getServerAccounts() {
  return fetch("/account")
    .then((r) => r.json())
    .then((response) => {
      if (response.error) return [];
      else {
        const orderBy = localStorage.getItem("orderBy");
        if (!orderBy) {
          return response.accounts;
        } else {
          let accountsOrdered = [];
          orderBy.split(",").forEach((order) => {
            response.accounts.forEach((acct) => {
              if (acct.account_id === order) {
                accountsOrdered.push(acct);
              }
            });
          });
          return accountsOrdered;
        }
      }
    })
    .catch((e) => false);
}
