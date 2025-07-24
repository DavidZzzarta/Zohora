import { h } from "preact";
import htm from "htm";
import { useContext, useState } from "preact/hooks";

import { ModalContext } from "../context.js";
import { Select } from "../components/Select.js";
import { InputForm } from "../components/InputForm.js";
import { isAmount, isAccount } from "../utils/validators.js";
import { useAccounts } from "../hooks/useAccounts.js";

import { ModalSkeleton } from "./ModalSkeleton.js";
import { ModalFooter } from "./ModalFooter.js";

const html = htm.bind(h);

export function AccountModal({ type }) {
  const { setModal } = useContext(ModalContext);
  const [error, setErrorMessage] = useState("");
  const [select, setSelect] = useState("Ahorros");
  const { createAccount } = useAccounts();

  const handleCreateAccount = (e) => {
    e.preventDefault();
    const fields = new FormData(e.target);
    const account = fields.get("account");
    const amount = fields.get("amount");
    if (isAmount({ value: amount }) && isAccount({ value: account })) {
      setErrorMessage("");
      createAccount({ account, amount, type: select });
      setModal("");
      return;
    } else {
      setErrorMessage("Verifica la información");
    }
  };
  const closeModal = (e) => {
    e.preventDefault();
    setModal("");
  };

  return html`
      <${ModalSkeleton} type=${type} title='Agregar cuenta'>
        <form onSubmit=${handleCreateAccount}>
        <section class="modal-card-body">
        <${Select}
          value=${select}
          onSelectChange=${(e) => setSelect(e)}
          label='Tipo de cuenta'
          options=${[
            {
              optionText: "Cuenta de ahorros",
              value: "Ahorros",
            },
            {
              optionText: "Cuenta corriente",
              value: "Corriente",
            },
            {
              optionText: "Cuenta de crédito",
              value: "Credito",
            },
          ]}
          />
        <${InputForm}
          name="account"
          type="text"
          placeholder="Davivienda, Capital One, ...."
          label="Nombre de la cuenta"
          errorMessage="Nombre inválido"
        />
        <${InputForm}
          name="amount"
          type="number"
          placeholder="7,500"
          label="Monto inicial"
          errorMessage="Monto inválido"
        />
        <p class="help is-danger">${error}</p>
        </section>
        <${ModalFooter}>
            <button type=submit class="button is-primary">Guardar</button>
            <button onClick=${closeModal} class="button modal-cancel">Cerrar</button>
          </${ModalFooter}>
        </form>
      </${ModalSkeleton}>
      `;
}
