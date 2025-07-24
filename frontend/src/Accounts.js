import { h } from "preact";
import { useContext } from "preact/hooks";
import htm from "htm";

import { ZohoraLogo } from "./Svgs.js";
import { ModalContext, UserContext } from "./context.js";
import { AccountsList } from "./components/AccountsList.js";

const html = htm.bind(h);

export function Accounts() {
  const { setModal } = useContext(ModalContext);
  const { user } = useContext(UserContext);

  return html`
    <h2 class="subtitle has-text-centered">Zohora Expense Tracker</h2>
    <h1 class="title">
      <${ZohoraLogo} styles="margin-right: 12px;" />
      ${user ? ` Hola, ${user.username}` : " Bienvenido"}
    </h1>
    <p class="menu-label">cuentas</p>
    <${AccountsList} />
    <hr class="bd-hr" />
    <button
      onClick=${() => setModal("account")}
      class="button is-link is-ghost is-fullwidth"
    >
      <span>Agregar cuenta</span>
    </button>
  `;
}
