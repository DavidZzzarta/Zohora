import { h, Fragment } from "preact";
import htm from "htm";

import { themes } from "../constants/themes.js";
import { useColor } from "../hooks/useColor.js";

const html = htm.bind(h);

export function ListOfRadios() {
  const { changeColor } = useColor();

  const hover = ({ newColor }) => changeColor(newColor);

  const noHover = () => changeColor(localStorage.getItem("theme"));

  const handleClickColor = ({ newColor }) => {
    changeColor(newColor);
    localStorage.setItem("theme", newColor);
  };

  return html`
    <${Fragment}>
      ${themes.map((e) => {
        return html`
          <label
            class="radio my-selectable-item"
            onMouseEnter=${() => hover({ newColor: e.name })}
            onMouseLeave=${() => noHover()}
            onClick=${() => handleClickColor({ newColor: e.name })}
          >
            <input
              type="radio"
              name="rsvp"
              checked=${localStorage.getItem("theme") === e.name}
            />
            <span class="radio-checkmark"></span>
            <span
              class="button is-static is-rounded"
              style="background-color:${e.colors[0]};"
            ></span>
            <span
              class="button is-static is-rounded"
              style="background-color:${e.colors[1]};"
            ></span>
            <span
              class="button is-static is-rounded"
              style="background-color:${e.colors[2]};"
            ></span>
          </label>
        `;
      })}
    </${Fragment}>
    `;
}
