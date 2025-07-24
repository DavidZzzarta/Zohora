import { h } from "preact";
import htm from "htm";
import { useContext } from "preact/hooks";

import { ModalContext, HomePageContext } from "../context.js";
import { useAccounts } from "../hooks/useAccounts.js";

import { ModalSkeleton } from "./ModalSkeleton.js";
import { ModalFooter } from "./ModalFooter.js";

const html = htm.bind(h);

export function DeleteAccountModal({ type }) {
  const { setModal } = useContext(ModalContext);
  const { homePage, setHomePage } = useContext(HomePageContext);
  const { deleteAccount } = useAccounts();

  const HandleDeleteAccount = () => {
    deleteAccount({ account_id: homePage });
    setHomePage("home");
    setModal("");
  };

  return html`
        <${ModalSkeleton} type=${type} title='Eliminar cuenta'>
        <section class="modal-card-body">
          <div class='block'>
            <p>¿Estas seguro de querer eliminar esta cuenta?</p>
            <br />
            <p>Esta accion no puede ser revertida</p>
          </div>
        </section>
        <${ModalFooter}>
              <button onClick=${() => HandleDeleteAccount()} class="button is-danger">Eliminar</button>
              <button onClick=${() => setModal("")} class="button modal-cancel">Cerrar</button>
        </${ModalFooter}>
        </${ModalSkeleton}>
      `;
}
