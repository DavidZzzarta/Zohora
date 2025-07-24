import { h } from "preact";
import { useContext, useEffect, useRef, useState, useMemo } from "preact/hooks";
import htm from "htm";
import { createSwapy, utils } from "swapy";

import { AccountContext, HomePageContext, UserContext } from "../context.js";
import { useAccounts } from "../hooks/useAccounts.js";
import { HandSvg } from "../Svgs.js";

const html = htm.bind(h);

function AccountsFilled() {
  const { setHomePage } = useContext(HomePageContext);
  const { user } = useContext(UserContext);
  let { refreshAccounts } = useAccounts();
  let { accounts } = useContext(AccountContext);
  const swapy = useRef(null);
  const container = useRef(null);
  const [slotItemMap, setSlotItemMap] = useState(
    utils.initSlotItemMap(accounts, "account_id"),
  );
  const slottedItems = useMemo(
    () => utils.toSlottedItems(accounts, "account_id", slotItemMap),
    [accounts, slotItemMap],
  );

  useEffect(() => {
    // If container element is loaded
    if (container.current) {
      swapy.current = createSwapy(container.current, {
        dragAxis: "y",
        animation: "none",
      });

      swapy.current.onSwap((event) => {
        setSlotItemMap(event.newSlotItemMap.asArray);
      });
    }

    return () => {
      swapy.current?.destroy();
    };
  }, []);

  useEffect(
    () =>
      utils.dynamicSwapy(
        swapy.current,
        accounts,
        "account_id",
        slotItemMap,
        setSlotItemMap,
      ),
    [accounts],
  );

  const handleClick = (id) => {
    setHomePage(slottedItems.find((item) => item.slotId === id).itemId);
    let newOrder = [];
    slottedItems.map((item) => {
      accounts.map((account) => {
        if (account.account_id === item.itemId) {
          newOrder.push(account);
        }
      });
    });
    refreshAccounts({ newOrder });
  };

  return html`
    <ul ref=${container}>
      ${accounts.map((e) => {
        return html`
          <li
            key=${e.account_id}
            data-swapy-slot=${e.account_id}
            class="draggable my-selectable-item"
            onClick=${() => handleClick(e.account_id)}
          >
            <div
              data-swapy-item=${e.account_id}
              class="fixed-grid has-10-cols is-gap-0.5"
            >
              <div class="grid">
                <div data-swapy-handle class="cell is-col-span-1">
                  <button class="button is-ghost">
                    <span
                      class="icon"
                      style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px;"
                    >
                      <${HandSvg} />
                    </span>
                  </button>
                </div>
                <div class="cell is-col-span-7">
                  <div class="columns">
                    <div class="column">
                      <p class="first-paragraph">${e.name}</p>
                      <p class="second-paragraph">${e.description}</p>
                    </div>
                  </div>
                </div>
                <div class="cell is-col-span-2">
                  <p class="second-paragraph">
                    ${Number(e.current_balance).toLocaleString()}<strong>
                      ${user ? user.sign : ""}</strong
                    >
                  </p>
                </div>
              </div>
            </div>
          </li>
        `;
      })}
    </ul>
  `;
}

export function AccountsList() {
  const { accounts } = useContext(AccountContext);
  return html`${!accounts[0] || !accounts
    ? html`<p>Sin cuentas aun.</p>`
    : html`<${AccountsFilled} />`}`;
}
