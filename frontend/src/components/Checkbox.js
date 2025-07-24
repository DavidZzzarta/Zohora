import { h } from "preact";
import htm from "htm";

const html = htm.bind(h);

export function Checkbox({ children }) {
  return html`
    <label class="checkbox">
      <nav class="level is-mobile">
        <div class="level-item">
          <input checked="checked" type="checkbox" />
          <div class="checkmark"></div>
        </div>
        <div class="level-item">${children}</div>
      </nav>
    </label>
  `;
}

/**
 * <${Checkbox} >
 *  <p>Tarea 1</p>
 * </${Checkbox}>
 */
