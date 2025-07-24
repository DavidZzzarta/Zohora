import { h } from "preact";
import htm from "htm";

const html = htm.bind(h);

export function ModalFooter({ children }) {
  return html` <footer class="modal-card-foot">${children}</footer> `;
}
