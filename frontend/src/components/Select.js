import { h } from "preact";
import htm from "htm";

const html = htm.bind(h);

export function Select({
  label,
  options,
  button = false,
  value,
  onSelectChange,
  click,
}) {
  return html`
    <label class="label">${label}</label>
    <div class="field ${button ? "has-addons" : ""}">
      <div class="control ${button ? "is-expanded" : ""}">
        <div class="select ${button ? "is-fullwidth" : ""}">
          <select
            value=${value}
            onChange=${(e) => onSelectChange(e.target.value)}
          >
            ${options.map(
              (e) =>
                html`<option value=${e.value ? e.value : e.optionText}>
                  ${e.optionText}
                </option>`,
            )}
          </select>
        </div>
      </div>
      ${button
        ? html`<div class="control">
            <button onClick=${click} class="button is-primary">
              ${button}
            </button>
          </div>`
        : ""}
    </div>
  `;
}

/*
<${Select}
  value=${firstId}
  onSelectChange=${(e) => handleSelect(e)}
  label='Cuenta' options=${accounts.map((e) => e.title)}
  />

  options = [
    { value: '1', optionText: 'Opcion 1'},
    { value: '2', optionText: 'Opcion 2'}
  ]

*/
