import { h } from "preact";
import htm from "htm";

import { FormSection, Form } from "../Form.js";
import { Modals } from "../modals/Modals.js";
import { HomeApplication } from "../HomeApplication.js";
import { useContext } from "preact/hooks";
import { UserContext } from "../context.js";

const html = htm.bind(h);

export function MainPage() {
  const { user } = useContext(UserContext);
  return html`
    <${Modals} />
    <div class="grid is-col-min-1">
      <div class="grid">
        <div class="cell is-col-span-1">
          <${HomeApplication} />
        </div>
        ${user
          ? ""
          : html`
              <div class="cell is-col-span-1 form-column">
                <${FormSection} />
              </div>
            `}
      </div>
    </div>
  `;
}
