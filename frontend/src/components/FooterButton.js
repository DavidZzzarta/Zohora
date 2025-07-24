import { useContext } from "preact/hooks";
import { h, Fragment } from "preact";
import htm from "htm";

import { ModalContext, ColorThemeContext } from "../context.js";
import { useSchema } from "../hooks/useSchema.js";
import { useColor } from "../hooks/useColor.js";

const html = htm.bind(h);

export function FooterButton({ children, spacing, className, type }) {
  const { setModal } = useContext(ModalContext);
  const { changeColor } = useColor();

  const handleClick = () => {
    if (type !== "dark") {
      setModal(type);
      return;
    }

    let schema = localStorage.getItem("theme");
    if (schema === "light-theme") {
      changeColor("default-theme");
      localStorage.setItem("theme", "default-theme");
      return;
    } else {
      changeColor("light-theme");
      localStorage.setItem("theme", "light-theme");
      return;
    }
  };

  return html`
    <${Fragment}>
      <div class='column is-${spacing} '>
        <nav class='level'>
          <div class='level-item has-text-centered'>
            <button class='button ${className}' onClick=${() => handleClick()} >
              ${children}
            </button>
          </div>
        </nav>
      </div>
    </${Fragment}>
    `;
}
