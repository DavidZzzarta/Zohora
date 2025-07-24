import { h } from "preact";
import htm from "htm";
import { useContext, useState, useCallback, useEffect } from "preact/hooks";

import { ModalContext, UserContext } from "../context.js";

import { getCurrency } from "../services/currency.js";
import { Select } from "../components/Select.js";
import { InputEditable } from "../components/InputEditable.js";

import { ModalSkeleton } from "./ModalSkeleton.js";
import { ModalFooter } from "./ModalFooter.js";

import { UserSvg, DangerSvg } from "../Svgs.js";

const html = htm.bind(h);

function NotLoggedModal() {
  return html`
    <div class="block">
      <div class="content">
        <p class="subtitle is-2">Aún no has iniciado sesión</p>
        <p>
          Tus datos se guardan localmente. Si inicias sesión, tus datos se
          guardarán en la nube, mucho más seguros.
        </p>
        <a class="link" href="/authentication">Inicia sesión o regístrate</a>
      </div>
    </div>
  `;
}

function LoggedModal() {
  const currency = useCallback(getCurrency(), []);
  const { user } = useContext(UserContext);
  const [sign, setSign] = useState("CO");
  useEffect(() => {
    if (!user) return;
    setSign(user.sign);
  }, [user]);

  const closeSession = () => {
    let init = { method: "POST" };
    fetch("/auth/logout", init)
      .then((r) => r.json())
      .then((response) => {
        if (response.error) return null;
        window.location.href = "/";
      })
      .catch((e) => console.error(e));
  };

  const deleteUser = () => {
    fetch("/auth", { method: "DELETE" })
      .then((r) => r.json())
      .then((response) => {
        if (response.error) return;
        else window.location.href = "/auth/otp?type=delete";
      })
      .catch((e) => console.error(e));
  };

  const handleSubmitSign = () => {
    let init = {
      body: JSON.stringify({ newData: sign, type: "sign" }),
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("/auth", init)
      .then((r) => {
        if (r.status === 204) window.location.href = "/";
        else return;
      })
      .catch((e) => console.error(e));
  };

  return html`
    <div class="block">
      <${Select}
        label="Tipo de moneda"
        onSelectChange=${(e) => setSign(e)}
        options=${currency.map((e) => {
          return {
            optionText: e.description,
            value: e.flag,
          };
        })}
        button="Guardar"
        value=${sign}
        click=${handleSubmitSign}
      />
    </div>
    <${InputEditable}
      disabled="false"
      type="username"
      label=${user?.username ?? ""}
      value=${user?.username ?? ""}
      icon="fa-solid fa-user"
    />
    <${InputEditable}
      disabled="false"
      type="email"
      label=${user?.email ?? ""}
      value=${user?.email ?? ""}
      icon="fa-solid fa-at"
    />
    <${InputEditable}
      disabled="false"
      type="password"
      label="***********"
      value=""
      icon="fa-solid fa-key"
    />
    <div class="block">
      <button onClick=${closeSession} class="button is-primary">
        <span class="icon">
          <${UserSvg} />
        </span>
        <span> Cerrar sesión </span>
      </button>
    </div>

    <hr class="bd-hr" />

    <div class="block">
      <button onClick=${deleteUser} class="button is-danger is-inverted">
        <span class="icon">
          <${DangerSvg} />
        </span>
        <span>Eliminar mi cuenta</span>
      </button>
    </div>
  `;
}

export function SettingsModal({ type }) {
  const { setModal } = useContext(ModalContext);
  const { user } = useContext(UserContext);

  return html`
      <${ModalSkeleton} type=${type} title='Configuracion'>
        <section class="modal-card-body">
        ${user ? html`<${LoggedModal} />` : html`<${NotLoggedModal} />`}
        </section>
        <${ModalFooter}>
            <button onClick=${() => setModal("")} class="button modal-cancel">
              Cerrar
            </button>
        </${ModalFooter}>
      </${ModalSkeleton}>
      `;
}
