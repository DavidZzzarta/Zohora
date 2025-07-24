import { h } from "preact";
import htm from "htm";
import { useState, useEffect, useRef } from "preact/hooks";

import { isUsername, isEmail, isPassword } from "../utils/validators.js";

import { CancelSvg, EditSvg } from "../Svgs.js";

const html = htm.bind(h);

export function InputEditable({ label, value, icon, type, disabled }) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleClick = () => {
    if (isEditing) setIsEditing(false);
    else setIsEditing(true);
  };

  const handleSubmit = () => {
    if (!error) return null;
    const body = {
      type,
      newData: inputValue,
    };
    let init = {
      body: JSON.stringify(body),
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("/auth", init)
      .then((r) => {
        if (r.status === 204) window.location.href = `/`;
        return r.json();
      })
      .then((response) => {
        if (
          response.status === 400 ||
          response.status === 400 ||
          response.error
        )
          return;
        else window.location.href = `/auth/otp?type=${type}`;
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => setIsEditing(false), [disabled]);

  useEffect(() => {
    if (isEditing) inputRef.current.focus();
  }, [isEditing]);

  useEffect(() => {
    if (type === "username") setError(isUsername({ value: inputValue }));
    if (type === "email") setError(isEmail({ value: inputValue }));
    if (type === "password") setError(isPassword({ value: inputValue }));
    return;
  }, [inputValue]);

  return html`
    <div class="field has-addons">
      <div class="control has-icons-left has-icons-right">
        ${isEditing
          ? html`<input
              onInput=${(e) => {
                setInputValue(e.target.value);
              }}
              name=${type}
              class="input"
              value=${inputValue}
              ref=${inputRef}
              placeholder="${label}"
            />`
          : html`<input class="input" placeholder="${label}" disabled />`}
        <span class="icon is-small is-left"><i class="${icon}"></i></span>
      </div>
      <p class="control">
        <button onClick=${() => handleClick()} class="button is-ghost">
          <p>
            <i class="${!isEditing ? "fas fa-pen" : "fa-solid fa-xmark"}"></i>
          </p>
          <span class="icon">
            ${!isEditing ? html`<${EditSvg} />` : html`<${CancelSvg} />`}
          </span>
        </button>
      </p>
    </div>
    <p
      class="help is-danger"
      style="display:${!isEditing ? "none;" : "block;"};"
    >
      ${error ? "" : "El valor es incorrecto"}
    </p>
    <button
      onClick=${handleSubmit}
      style="display:${!isEditing ? "none;" : "block;"};"
      class="button is-ghost"
    >
      Actualizar
    </button>
  `;
}
