import { h } from "preact";
import htm from "htm";
import { useContext } from "preact/hooks";

import { ModalContext } from "../context.js";
import { ListOfRadios } from "../components/ListOfRadios.js";

import { ModalSkeleton } from "./ModalSkeleton.js";
import { ModalFooter } from "./ModalFooter.js";

const html = htm.bind(h);

export function ThemesModal({ type }) {
  const { setModal } = useContext(ModalContext);
  return html`
      <${ModalSkeleton} type=${type} title='Escoge un tema'>
        <section class="modal-card-body">
        <div class='field'>
          <label class='label'>Color ( Botones, Iconos, Texto, Fondo )</label>
          <div class='controls'>
            <div class='radios'>
              <${ListOfRadios}/>
            </div>
          </div>
        </div>
        </section>
        <${ModalFooter}>
          <button onClick=${() => setModal("")} class="button modal-cancel">Cerrar</button>
        </${ModalFooter}>
      </${ModalSkeleton}>
      `;
}
