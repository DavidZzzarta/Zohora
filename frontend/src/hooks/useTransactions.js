import { useContext, useEffect } from "preact/hooks";

import {
  AccountContext,
  HomePageContext,
  TransactionContext,
  UserContext,
} from "../context.js";
import { updateLocalStorage } from "../utils/localStorage.js";
import { getLocalTransactions } from "../services/transactions.js";
import {
  createServerTransaction,
  deleteServerTransaction,
} from "../services/transactions.js";
import { getServerTransactions } from "../services/transactions.js";

export function useTransactions() {
  const { transactions, setTransactions } = useContext(TransactionContext);
  const { accounts, setAccounts } = useContext(AccountContext);
  const { homePage } = useContext(HomePageContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (homePage === "home") return;
    if (user)
      getServerTransactions({ account_id: homePage }).then((r) =>
        setTransactions(r),
      );
    else setTransactions(getLocalTransactions({ account_id: homePage }));
  }, []);

  const updateAccounts = ({ account_id, amount }) => {
    setAccounts((currentAccounts) => {
      const accountIndex = currentAccounts.findIndex(
        (acct) => acct.account_id === account_id,
      );

      if (accountIndex !== -1) {
        const updatedAccounts = [...currentAccounts];

        updatedAccounts[accountIndex] = {
          ...updatedAccounts[accountIndex],
          current_balance:
            Number(updatedAccounts[accountIndex].current_balance) +
            Number(amount),
        };

        if (!user) {
          updateLocalStorage({ type: "accounts", data: updatedAccounts });
        }

        return updatedAccounts;
      }

      return currentAccounts;
    });
  };

  const createTransaction = ({ account_id, amount, description }) => {
    if (user) {
      createServerTransaction({ account_id, amount, description }).then((r) => {
        console.log(r);
        setTransactions([
          {
            account_id,
            transaction_id: r.transaction.transaction_id,
            amount: Number(amount),
            transaction_date: new Date().toLocaleString(),
            description,
          },
          ...transactions,
        ]);
      });
      updateAccounts({ account_id, amount: Number(amount) });
      return;
    } else {
      const transaction = {
        account_id,
        transaction_id: crypto.randomUUID(),
        amount: Number(amount),
        transaction_date: new Date().toLocaleString(),
        description,
      };
      setTransactions([transaction, ...transactions]);

      let localStorageTransactions = JSON.parse(
        localStorage.getItem("transactions"),
      );
      updateLocalStorage({
        type: "transactions",
        data: [transaction, ...localStorageTransactions],
      });
      updateAccounts({ account_id, amount: Number(amount) });
      return;
    }
  };
  const deleteTransaction = ({ transaction_id }) => {
    let account_id = transactions.filter(
      (trans) => trans.transaction_id === transaction_id,
    )[0].account_id;
    let amount = transactions.filter(
      (trans) => trans.transaction_id === transaction_id,
    )[0].amount;

    const data = transactions.filter(
      (trans) => trans.transaction_id !== transaction_id,
    );

    if (user) {
      deleteServerTransaction({ transaction_id }).then((r) =>
        setTransactions(data),
      );
      updateAccounts({ account_id, amount: -amount });
      return;
    } else {
      setTransactions(data);
      let localTransactions = JSON.parse(
        localStorage.getItem("transactions"),
      ).filter((t) => t.account_id !== account_id);
      updateLocalStorage({
        type: "transactions",
        data: [...localTransactions, ...data],
      });

      updateAccounts({ account_id, amount: -amount });
      return;
    }
  };

  return {
    transactions,
    createTransaction,
    deleteTransaction,
  };
}
