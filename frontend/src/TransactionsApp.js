import { h } from "preact";
import htm from "htm";
import { useContext } from "preact/hooks";

import { Transactions } from "./components/Transactions.js";
import { HomePageContext, AccountContext, ModalContext } from "./context.js";
import { TopButton } from "./components/TopButton.js";

import { BackSvg, TrashSvg, ZohoraLogo } from "./Svgs.js";

const html = htm.bind(h);

export function TransactionsApp() {
  let { accounts } = useContext(AccountContext);
  const { homePage } = useContext(HomePageContext);

  const { setHomePage } = useContext(HomePageContext);
  const { setModal } = useContext(ModalContext);

  const account = accounts.find((e) => e.account_id === homePage);
  return html`
    <nav class="level is-mobile">
      <${TopButton} click=${() => setHomePage("home")} position='level-left'}>
        <${BackSvg} />
      </${TopButton}>
      <${TopButton} click=${() => setHomePage("home")} position='level-center'}>
        <${ZohoraLogo} />
      </${TopButton}>
      <${TopButton} click=${() => setModal("delete")} position='level-right'}>
        <${TrashSvg} />
      </${TopButton}>
    </nav>
    <nav class="level is-mobile">
      <div class="level-left">
        <div>
          <h3 class="title is-3">${account.name}</h3>
        </div>
      </div>
      <div class="level-right">
        <div>
          <h4 class="subtitle is-6">COP ${account.current_balance.toLocaleString()}</h4>
        </div>
      </div>
    </nav>
    <hr class="bd-hr" />
    <p class="menu-label">Transacciones</p>
    <${Transactions} />
  `;
}
