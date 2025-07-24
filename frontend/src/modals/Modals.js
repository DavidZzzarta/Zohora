import { h } from "preact";
import htm from "htm";

import { SettingsModal } from "./SettingsModal.js";
import { AccountModal } from "./AccountModal.js";
import { DeleteAccountModal } from "./DeleteAccountModal.js";
import { FaqModal } from "./FaqModal.js";
import { ThemesModal } from "./ThemesModal.js";
import { TransactionModal } from "./TransactionModal.js";

const html = htm.bind(h);

export function Modals() {
  return html`
    <${SettingsModal} type="set" />
    <${FaqModal} type="faq" />
    <${ThemesModal} type="theme" />
    <${TransactionModal} type="plus" />
    <${AccountModal} type="account" />
    <${DeleteAccountModal} type="delete" />
  `;
}
