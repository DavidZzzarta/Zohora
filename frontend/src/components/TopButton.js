import { h } from "preact";
import htm from "htm";

const html = htm.bind(h);

export function TopButton({ click, children, position }) {
  return html`
    <div class="level-item ${position} has-text-centered">
      <div>
        <button onClick=${click} class="button is-ghost">
          <span class="icon"> ${children} </span>
        </button>
      </div>
    </div>
  `;
}
