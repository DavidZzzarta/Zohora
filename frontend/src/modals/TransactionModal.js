import { h } from "preact";
import htm from "htm";
import { useContext, useEffect, useState } from "preact/hooks";

import { ModalContext, AccountContext } from "../context.js";
import { Select } from "../components/Select.js";
import { InputForm } from "../components/InputForm.js";
import { isAmount, isDescription } from "../utils/validators.js";
import { useTransactions } from "../hooks/useTransactions.js";

import { ModalSkeleton } from "./ModalSkeleton.js";
import { ModalFooter } from "./ModalFooter.js";

const html = htm.bind(h);

function WithoutAccounts() {
  const { setModal } = useContext(ModalContext);
  return html`
      <section class="modal-card-body">
        <p class='subtitle is-3'>Aún no tienes cuentas</p>
      </section>
      <${ModalFooter}>
            <button onClick=${() => setModal("")} class="button modal-cancel">Cerrar</button>
      </${ModalFooter}>
  `;
}

function WithAccounts() {
  const { accounts } = useContext(AccountContext);
  const { createTransaction } = useTransactions({ account_id: "" });
  const [select, setSelect] = useState();
  const [error, setErrorMessage] = useState("");
  const { setModal } = useContext(ModalContext);

  useEffect(() => {
    setSelect(accounts[0].account_id);
  }, [accounts]);
  const handleCreateTransaction = (e) => {
    e.preventDefault();
    const fields = new FormData(e.target);
    const amount = fields.get("amount");
    const description = fields.get("description");
    if (isAmount({ value: amount }) && isDescription({ value: description })) {
      setErrorMessage("");
      createTransaction({ account_id: select, amount, description });
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
  <form onSubmit=${handleCreateTransaction}>
      <section class="modal-card-body">
      <${Select}
        value=${select}
        onSelectChange=${(e) => setSelect(e)}
        label='Cuenta'
        options=${accounts.map((e) => {
          return {
            optionText: e.name,
            value: e.account_id,
          };
        })} />
      <${InputForm}
        name="amount"
        type="number"
        placeholder="7,500"
        label="Monto"
        errorMessage="Monto inválido"
      />
      <${InputForm}
        name="description"
        type="text"
        placeholder="Comida, préstamo, etc."
        label="Descripción"
        errorMessage=""
      />
      <p class="help is-danger">${error}</p>
      </section>
      <${ModalFooter}>
            <button type='submit' class="button is-primary">Guardar</button>
            <button onClick=${closeModal} class="button modal-cancel">Cerrar</button>
      </${ModalFooter}>
      </form>
  `;
}

export function TransactionModal({ type }) {
  const { accounts } = useContext(AccountContext);
  return html`
    <${ModalSkeleton} save=true type=${type} title='Agregar transaccion'>
      ${!accounts[0] || !accounts ? html`<${WithoutAccounts} />` : html`<${WithAccounts} />`}
    </${ModalSkeleton}>
    `;
}
