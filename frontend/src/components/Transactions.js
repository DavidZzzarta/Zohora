import { h } from "preact";
import htm from "htm";
import { useState } from "preact/hooks";

import { useTransactions } from "../hooks/useTransactions.js";

const html = htm.bind(h);

export function Transactions() {
  const [expand, setExpand] = useState([false, 0]);
  const { deleteTransaction, transactions } = useTransactions();

  const expandMenu = (id) =>
    expand[0] ? setExpand([false, 0]) : setExpand([true, id]);

  return html`
    ${transactions.map((e) => {
      return html`
        <aside class="menu" key=${e.transaction_id}>
          <ul class="menu-list">
            <li class="accordion">
              <button
                class="accordion-button"
                onClick=${() => expandMenu(e.transaction_id)}
              >
                <nav class="level is-mobile">
                  <div class="level-left">
                    <div class="level-item">
                      <div>
                        <p class="help">
                          <strong>COP</strong> ${Number(
                            e.amount,
                          ).toLocaleString()}
                        </p>
                        <time class="help">${e.transaction_date}</time>
                      </div>
                    </div>
                  </div>

                  <div class="level-right">
                    <div class="level-item has-text-centered">
                      <div>
                        <p class="title is-point">·</p>
                      </div>
                    </div>
                  </div>
                </nav>
              </button>
              <div
                class="accordion-content ${expand &&
                e.transaction_id === expand[1]
                  ? "is-active"
                  : ""}"
              >
                <ul class="accordion-list">
                  <li><p>Description: ${e.description}</p></li>
                </ul>
                <button
                  onClick=${() =>
                    deleteTransaction({ transaction_id: e.transaction_id })}
                  class="button is-danger is-outlined is-fullwidth"
                >
                  Eliminar
                </button>
              </div>
            </li>
          </ul>
        </aside>
      `;
    })}
  `;
}
