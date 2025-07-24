import { h } from "preact";
import htm from "htm";
import { useState, useEffect, useRef } from "preact/hooks";

import {
  isUsername,
  isAccount,
  isAmount,
  isDescription,
  isEmail,
  isPassword,
} from "../utils/validators.js";

const html = htm.bind(h);

export function InputForm({ label, type, placeholder, errorMessage, name }) {
  const firstInput = useRef(true);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (firstInput.current) {
      firstInput.current = value !== "";
      return;
    }
    if (type === "text") setError(isUsername({ value }));
    if (type === "email") setError(isEmail({ value }));
    if (type === "password") setError(isPassword({ value }));
    if (type === "account") setError(isAccount({ value }));
    if (name === "amount") setError(isAmount({ value }));
    if (type === "description") setError(isDescription({ value }));
    return;
  }, [value]);

  return html`
    <div class="field">
      <label class="label">${label}</label>
      <div class="control" style="position:relative;">
        <input
          onInput=${(e) => setValue(e.target.value)}
          class="input ${firstInput.current ? "" : error ? "is-success" : ""}"
          type=${type === "password" && shown ? "text" : type}
          placeholder=${placeholder}
          name=${name}
        />
        ${type === "password" && value
          ? html`<button
              type="button"
              tabindex="-1"
              style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;padding:0;cursor:pointer;"
              aria-label=${shown ? "Ocultar contraseña" : "Mostrar contraseña"}
              onClick=${(e) => {
                e.preventDefault();
                setShown((s) => !s);
              }}
            >
              <i
                style="color: #ffffff7a; font-size: 18px;"
                class=${shown ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}
              ></i>
            </button>`
          : ""}
      </div>
      <p class="help is-danger">
        ${firstInput.current ? "" : !error && value !== "" ? errorMessage : ""}
      </p>
    </div>
  `;
}
