import { h } from "preact";
import htm from "htm";
import { useContext } from "preact/hooks";

import { ModalContext } from "../context.js";

const html = htm.bind(h);

export function ModalSkeleton({ type, title, children }) {
  const { setModal, modal } = useContext(ModalContext);
  return html`
    <div class="modal ${modal === type ? "is-active" : ""}">
      <div onClick=${() => setModal("")} class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">${title}</p>
          <button
            onClick=${() => setModal("")}
            class="delete"
            aria-label="close"
          ></button>
        </header>
        ${children}
      </div>
    </div>
  `;
}
