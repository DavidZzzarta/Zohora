import { h } from "preact";
import htm from "htm";

import { GoogleSvg } from "../Svgs";

const html = htm.bind(h);

export function GoogleButton({ text, href }) {
  return html`
    <div class="field">
      <div class="control">
        <nav class="level">
          <div class="level-item has-text-centered">
            <a
              href=${href}
              class="button is-rounded is-link is-inverted is-medium"
            >
              <span class="icon">
                <${GoogleSvg} />
              </span>
              <span> ${text} </span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  `;
}
