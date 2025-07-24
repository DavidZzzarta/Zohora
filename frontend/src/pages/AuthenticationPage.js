import { h } from "preact";
import htm from "htm";

import { FormSection } from "../Form.js";
import { TopButton } from "../components/TopButton.js";
import { ZohoraLogo } from "../Svgs.js";

const html = htm.bind(h);

export function AuthenticationPage() {
  return html`
  <br />
  <section class='hero is-medium'>
  <${TopButton} click=${() => (window.location.href = "/")} position='level-center'}><${ZohoraLogo} /></${TopButton}>
  </section>
  <${FormSection} />
    `;
}
