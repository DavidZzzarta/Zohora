import { useContext, useEffect } from "preact/hooks";

import { updateLocalStorage } from "../utils/localStorage.js";
import { useTransactions } from "./useTransactions.js";
import { AccountContext, UserContext } from "../context.js";
import {
  createServerAccount,
  deleteServerAccount,
} from "../services/accounts.js";

export function useAccounts() {
  const { accounts, setAccounts } = useContext(AccountContext);
  const { createTransaction } = useTransactions();
  const { user } = useContext(UserContext);
  //const { orderBy, setOrderBy } = useState()

  const createAccount = ({ account, amount, type }) => {
    if (user) {
      createServerAccount({
        name: account,
        description: type,
        current_balance: amount,
      }).then((r) => {
        setAccounts([
          ...accounts,
          {
            account_id: r.account.account_id,
            name: account,
            current_balance: Number(amount),
            description: type,
          },
        ]);
      });
      return;
    } else {
      let account_id = crypto.randomUUID();
      const data = [
        ...accounts,
        {
          account_id,
          name: account,
          current_balance: Number(amount),
          description: type,
        },
      ];

      createTransaction({
        account_id,
        amount: Number(amount),
        description: "Primer monto",
      });
      setAccounts(data);
      updateLocalStorage({ data, type: "accounts" });
    }
  };

  const deleteAccount = ({ account_id }) => {
    const data = accounts.filter((acct) => acct.account_id !== account_id);
    if (user) {
      deleteServerAccount({ account_id }).then((r) => setAccounts(data));
      return;
    } else {
      setAccounts(data);
      updateLocalStorage({ data, type: "accounts" });
      return;
    }
  };

  const refreshAccounts = ({ newOrder }) => {
    if (!user) {
      localStorage.setItem("accounts", JSON.stringify(newOrder));
      setAccounts([...newOrder]);
    } else {
      let newOrderArray = [];
      newOrder.forEach((e) => {
        newOrderArray.push(e.account_id);
      });
      localStorage.setItem("orderBy", newOrderArray);
    }
  };

  return { accounts, createAccount, deleteAccount, refreshAccounts };
}
